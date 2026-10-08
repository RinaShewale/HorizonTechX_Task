import { closeSync, openSync, readdirSync, readSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const songsDirectory = resolve(process.cwd(), 'public', 'songs')

const readSongTags = (filePath) => {
  const descriptor = openSync(filePath, 'r')
  try {
    const header = Buffer.alloc(10)
    if (readSync(descriptor, header, 0, header.length, 0) !== header.length || header.toString('ascii', 0, 3) !== 'ID3') {
      return { title: '', artist: '' }
    }

    const version = header[3]
    const tagLength = (header[6] & 0x7f) * 2097152
      + (header[7] & 0x7f) * 16384
      + (header[8] & 0x7f) * 128
      + (header[9] & 0x7f)
    const tag = Buffer.alloc(tagLength)
    readSync(descriptor, tag, 0, tag.length, header.length)

    const decodeText = (frame) => {
      const encoding = frame[0]
      const text = frame.subarray(1)
      let decoded

      if (encoding === 1) {
        const isBigEndian = text[0] === 0xfe && text[1] === 0xff
        const content = text.subarray(2)
        const normalized = Buffer.from(content)
        if (isBigEndian) {
          for (let index = 0; index + 1 < normalized.length; index += 2) {
            const byte = normalized[index]
            normalized[index] = normalized[index + 1]
            normalized[index + 1] = byte
          }
        }
        decoded = normalized.toString('utf16le')
      } else if (encoding === 2) {
        const normalized = Buffer.from(text)
        for (let index = 0; index + 1 < normalized.length; index += 2) {
          const byte = normalized[index]
          normalized[index] = normalized[index + 1]
          normalized[index + 1] = byte
        }
        decoded = normalized.toString('utf16le')
      } else {
        decoded = text.toString(encoding === 3 ? 'utf8' : 'latin1')
      }

      return decoded.replace(/^\uFEFF/, '').split('\0')[0].trim()
    }

    let offset = 0
    if (version === 3 && header[5] & 0x40) offset = 4 + tag.readUInt32BE(0)
    if (version === 4 && header[5] & 0x40) offset = (tag[0] & 0x7f) * 2097152
      + (tag[1] & 0x7f) * 16384
      + (tag[2] & 0x7f) * 128
      + (tag[3] & 0x7f)

    const tags = { title: '', artist: '' }
    while (offset < tag.length) {
      const headerLength = version === 2 ? 6 : 10
      if (offset + headerLength > tag.length) break
      const frameId = tag.toString('ascii', offset, offset + (version === 2 ? 3 : 4))
      if (!/^[A-Z0-9]{3,4}$/.test(frameId)) break

      const frameSize = version === 2
        ? tag[offset + 3] * 65536 + tag[offset + 4] * 256 + tag[offset + 5]
        : version === 4
          ? (tag[offset + 4] & 0x7f) * 2097152 + (tag[offset + 5] & 0x7f) * 16384
            + (tag[offset + 6] & 0x7f) * 128 + (tag[offset + 7] & 0x7f)
          : tag.readUInt32BE(offset + 4)
      const frameStart = offset + headerLength
      if (!frameSize || frameStart + frameSize > tag.length) break

      if (frameId === 'TIT2' || frameId === 'TT2') tags.title = decodeText(tag.subarray(frameStart, frameStart + frameSize))
      if (frameId === 'TPE1' || frameId === 'TP1') tags.artist = decodeText(tag.subarray(frameStart, frameStart + frameSize))
      offset = frameStart + frameSize
    }

    return tags
  } finally {
    closeSync(descriptor)
  }
}

const getSongManifest = () => readdirSync(songsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.mp3'))
  .map((entry) => {
    const tags = readSongTags(resolve(songsDirectory, entry.name))
    return {
      file: entry.name,
      src: `/songs/${encodeURIComponent(entry.name)}`,
      title: tags.title || entry.name.replace(/\.mp3$/i, ''),
      artist: tags.artist,
    }
  })
  .sort((first, second) => first.file.localeCompare(second.file))

const songsManifestPlugin = () => ({
  name: 'songs-manifest',
  configureServer(server) {
    server.middlewares.use('/songs/manifest.json', (_request, response) => {
      try {
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.end(JSON.stringify(getSongManifest()))
      } catch (error) {
        server.config.logger.error(`Could not read songs folder: ${error.message}`)
        response.statusCode = 500
        response.end(JSON.stringify({ error: 'Could not read songs folder.' }))
      }
    })
  },
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'songs/manifest.json',
      source: JSON.stringify(getSongManifest()),
    })
  },
})

export default defineConfig({
  plugins: [songsManifestPlugin()],
})
