import './style.css'

// Inline SVG Icons
const icon = (name, size = 18) => {
  const paths = {
    play: '<path d="m8 5 11 7-11 7V5Z" fill="currentColor"/>',
    pause: '<path d="M8 5h3v14H8zM15 5h3v14h-3z" fill="currentColor"/>',
    heart: '<path d="M20.8 8.7c0 4.1-8.8 10.1-8.8 10.1S3.2 12.8 3.2 8.7a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    volume: '<path d="M4 10v4h4l5 4V6l-5 4H4Zm12-2a6 6 0 0 1 0 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    mute: '<path d="M4 10v4h4l5 4V6l-5 4H4Zm12 1 5 5m0-5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  }
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">${paths[name] ?? ''}</svg>`
}

// Elements
const audio = document.querySelector('#audio')
const trackList = document.querySelector('#track-list')
const searchInput = document.querySelector('#search')
const emptyState = document.querySelector('#empty-state')
const toast = document.querySelector('#toast')
const vinylRecord = document.querySelector('#vinyl-record')
const nowPlayingCard = document.querySelector('.now-playing-card')

// Stored lists
const readStoredList = (key) => {
  try {
    const stored = JSON.parse(localStorage.getItem(key) ?? '[]')
    return Array.isArray(stored) ? stored.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

const favoriteIds = new Set(readStoredList('sonder-favorites'))
let recentIds = readStoredList('sonder-recent')
let tracks = []
let currentIndex = -1
let currentView = 'all'
let isShuffling = false
let repeatMode = 0 // 0: off, 1: all, 2: one
let toastTimer

// Built-in Web Audio Generator so audio can be enjoyed immediately
let audioCtx = null
let synthOsc = null
let synthGain = null

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}

const showToast = (message) => {
  toast.textContent = message
  toast.classList.add('is-visible')
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600)
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character])

const getVisibleTracks = () => {
  const query = searchInput.value.trim().toLowerCase()
  let filtered = tracks.filter((track) => {
    const isFavorite = currentView !== 'favorites' || favoriteIds.has(track.id)
    const searchable = `${track.title} ${track.artist ?? ''} ${track.file ?? ''}`.toLowerCase()
    const matches = !query || searchable.includes(query)
    return isFavorite && matches
  })

  // If in 'Recently Played' view, show only recently played tracks sorted by recency
  if (currentView === 'recent') {
    const recentOrder = new Map(recentIds.map((id, index) => [id, index]))
    filtered = filtered.filter((track) => recentOrder.has(track.id))
    filtered.sort((a, b) => (recentOrder.get(a.id) ?? 0) - (recentOrder.get(b.id) ?? 0))
    return filtered
  }

  // In 'All Tracks' or 'Favorites' view: show all songs in original order
  filtered.sort((a, b) => a.index - b.index)
  return filtered
}

const setArt = (element, index) => {
  if (!element) return
  element.className = `${element.className.replace(/\bart-\d+\b/g, '').trim()} art-${index % 8}`
}

const renderTracks = () => {
  const visible = getVisibleTracks()
  trackList.innerHTML = visible.map((track) => {
    const active = tracks[currentIndex]?.id === track.id
    const liked = favoriteIds.has(track.id)

    return `
      <div class="track-row${active ? ' is-playing' : ''}" role="listitem" data-track-id="${track.id}">
        <span class="track-num">${String(track.index + 1).padStart(2, '0')}</span>
        <button class="track-title-cell" type="button" data-play-id="${track.id}" aria-label="Play ${escapeHtml(track.title)}">
          <span class="track-avatar art-${track.index % 8}">♫</span>
          <span class="track-info-text">
            <strong>${escapeHtml(track.title)}</strong>
            <small>${escapeHtml(track.artist || 'Local collection')}</small>
          </span>
        </button>
        <span class="track-source">${escapeHtml(track.artist || 'Sonder Archive')}</span>
        <span class="track-time">${track.duration ? formatTime(track.duration) : '3:15'}</span>
        <button class="icon-button row-heart-btn${liked ? ' is-liked' : ''}" type="button" data-favorite-id="${track.id}" aria-label="${liked ? 'Remove from' : 'Add to'} favorites">
          ${liked ? '♥' : '♡'}
        </button>
      </div>`
  }).join('')

  emptyState.hidden = visible.length > 0
  document.querySelector('#track-count').textContent = `${visible.length} ${visible.length === 1 ? 'track' : 'tracks'}`

  const headingLabel = document.querySelector('#heading-label')
  const sectionKicker = document.querySelector('#section-kicker')

  if (searchInput.value.trim()) {
    headingLabel.textContent = 'Search results'
    sectionKicker.textContent = 'FOUND IN COLLECTION'
  } else if (currentView === 'favorites') {
    headingLabel.textContent = 'Liked tracks'
    sectionKicker.textContent = 'YOUR SAVED MOMENTS'
  } else if (currentView === 'recent') {
    headingLabel.textContent = 'Recently played'
    sectionKicker.textContent = 'PICK UP WHERE YOU LEFT OFF'
  } else {
    headingLabel.textContent = 'All tracks'
    sectionKicker.textContent = 'CURATED COLLECTION'
  }

  // Row listeners
  trackList.querySelectorAll('[data-play-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const track = tracks.find((item) => item.id === btn.dataset.playId)
      if (track) playTrack(track.index, true)
    })
  })

  trackList.querySelectorAll('[data-favorite-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      toggleFavorite(btn.dataset.favoriteId)
    })
  })

  trackList.querySelectorAll('.track-row').forEach((row) => {
    row.addEventListener('click', () => {
      const track = tracks.find((item) => item.id === row.dataset.trackId)
      if (track) playTrack(track.index, true)
    })
  })
}

const updateFavoriteButtons = () => {
  const track = tracks[currentIndex]
  const isLiked = Boolean(track && favoriteIds.has(track.id))
  const favBtn = document.querySelector('#now-favorite')
  if (favBtn) {
    favBtn.textContent = isLiked ? '♥' : '♡'
    favBtn.classList.toggle('is-liked', isLiked)
    favBtn.setAttribute('aria-pressed', String(isLiked))
  }
  document.querySelector('#favorite-count').textContent = favoriteIds.size
}

const updateQueue = () => {
  const queueTrack = currentIndex >= 0 ? tracks[(currentIndex + 1) % tracks.length] : tracks[0]
  if (!queueTrack) return
  document.querySelector('#queue-title').textContent = queueTrack.title
  document.querySelector('#queue-artist').textContent = queueTrack.artist || 'Local collection · Your collection'
  document.querySelector('#queue-time').textContent = queueTrack.duration ? formatTime(queueTrack.duration) : '3:15'
}

const updatePlayState = () => {
  const playing = !audio.paused || Boolean(synthOsc)
  const playButton = document.querySelector('#play-button')
  playButton.innerHTML = icon(playing ? 'pause' : 'play', 18)
  playButton.setAttribute('aria-label', playing ? 'Pause' : 'Play')

  document.querySelector('#playing-status-text').textContent = playing
    ? 'NOW PLAYING'
    : currentIndex >= 0 ? 'PAUSED' : 'READY WHEN YOU ARE'

  vinylRecord?.parentElement?.classList.toggle('is-spinning', playing)
  nowPlayingCard?.classList.toggle('is-active-eq', playing)

  renderTracks()
}

// Gentle Ambient Synth Fallback
const playAmbientChords = (index) => {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    if (synthOsc) {
      synthOsc.stop()
      synthOsc.disconnect()
    }
    const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]
    synthOsc = audioCtx.createOscillator()
    synthGain = audioCtx.createGain()
    synthOsc.type = 'sine'
    synthOsc.frequency.setValueAtTime(frequencies[index % frequencies.length], audioCtx.currentTime)
    synthGain.gain.setValueAtTime(0.04, audioCtx.currentTime)
    synthOsc.connect(synthGain)
    synthGain.connect(audioCtx.destination)
    synthOsc.start()
  } catch (e) {
    console.warn(e)
  }
}

const stopAmbientChords = () => {
  if (synthOsc) {
    try { synthOsc.stop() } catch {}
    synthOsc = null
  }
}

const playTrack = async (index, shouldPlay) => {
  if (!tracks[index]) return
  const changed = currentIndex !== index
  currentIndex = index
  const track = tracks[index]

  if (changed) {
    if (track.src) {
      stopAmbientChords()
      audio.src = track.src
      audio.load()
    }
    document.querySelector('#current-time').textContent = '0:00'
    document.querySelector('#duration').textContent = track.duration ? formatTime(track.duration) : '3:15'
    document.querySelector('#progress').value = 0
    document.querySelector('#progress').style.setProperty('--val', '0%')
    document.querySelector('#now-title').textContent = track.title
    document.querySelector('#now-artist').textContent = track.artist || 'Local collection · Sonder Sound'
    document.querySelector('#feature-number').textContent = String(track.index + 1).padStart(2, '0')
    setArt(document.querySelector('#feature-art'), track.index)
    updateFavoriteButtons()
    updateQueue()
  }

  if (shouldPlay) {
    try {
      if (track.src) {
        await audio.play()
      } else {
        playAmbientChords(track.index)
      }
    } catch (error) {
      console.error(`Could not play "${track.title}".`, error)
      showToast(`Could not play "${track.title}". Check that the audio file is available.`)
    }
  } else {
    audio.pause()
    stopAmbientChords()
  }
  updatePlayState()
}

const togglePlay = () => {
  if (currentIndex < 0) {
    playTrack(0, true)
  } else if (audio.paused && !synthOsc) {
    if (tracks[currentIndex]?.src) {
      audio.play().catch((error) => {
        console.error(`Could not play "${tracks[currentIndex].title}".`, error)
        showToast(`Could not play "${tracks[currentIndex].title}". Check that the audio file is available.`)
      })
    } else {
      playAmbientChords(currentIndex)
    }
    updatePlayState()
  } else {
    audio.pause()
    stopAmbientChords()
    updatePlayState()
  }
}

const playNext = () => {
  if (!tracks.length) return
  const next = isShuffling && tracks.length > 1
    ? (currentIndex + 1 + Math.floor(Math.random() * (tracks.length - 1))) % tracks.length
    : (currentIndex + 1) % tracks.length
  playTrack(next, true)
}

const playPrevious = () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0
    return
  }
  playTrack(currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1, true)
}

const toggleFavorite = (id) => {
  if (favoriteIds.has(id)) {
    favoriteIds.delete(id)
    showToast('Removed from favorites.')
  } else {
    favoriteIds.add(id)
    showToast('Added to favorites.')
  }
  try {
    localStorage.setItem('sonder-favorites', JSON.stringify([...favoriteIds]))
  } catch {}
  updateFavoriteButtons()
  renderTracks()
}

const rememberTrack = () => {
  const track = tracks[currentIndex]
  if (!track) return
  recentIds = [track.id, ...recentIds.filter((id) => id !== track.id)].slice(0, 20)
  try {
    localStorage.setItem('sonder-recent', JSON.stringify(recentIds))
  } catch {}
}

const updateSlider = (el, pct) => el.style.setProperty('--val', `${pct}%`)

// Tabs
document.querySelectorAll('[data-view]').forEach((tab) => {
  tab.addEventListener('click', () => {
    currentView = tab.dataset.view
    document.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle('is-active', b.dataset.view === currentView))
    renderTracks()
  })
})

searchInput.addEventListener('input', renderTracks)

document.querySelector('#shuffle-all').addEventListener('click', () => {
  if (!tracks.length) return
  isShuffling = true
  document.querySelector('#shuffle-button').classList.add('is-enabled')
  playTrack(Math.floor(Math.random() * tracks.length), true)
})

document.querySelector('#play-button').addEventListener('click', togglePlay)
document.querySelector('#next-button').addEventListener('click', playNext)
document.querySelector('#previous-button').addEventListener('click', playPrevious)

document.querySelector('#shuffle-button').addEventListener('click', (e) => {
  isShuffling = !isShuffling
  e.currentTarget.classList.toggle('is-enabled', isShuffling)
  showToast(isShuffling ? 'Shuffle on' : 'Shuffle off')
})

document.querySelector('#repeat-button').addEventListener('click', (e) => {
  repeatMode = (repeatMode + 1) % 3
  e.currentTarget.classList.toggle('is-enabled', repeatMode > 0)
  showToast(['Repeat off', 'Repeat all', 'Repeat one'][repeatMode])
})

document.querySelector('#now-favorite').addEventListener('click', () => {
  if (tracks[currentIndex]) toggleFavorite(tracks[currentIndex].id)
})

// Progress bar seeking
const progress = document.querySelector('#progress')
progress.addEventListener('input', () => {
  if (!Number.isFinite(audio.duration)) return
  audio.currentTime = (Number(progress.value) / 100) * audio.duration
  updateSlider(progress, Number(progress.value))
})

audio.addEventListener('timeupdate', () => {
  if (!Number.isFinite(audio.duration)) return
  const pct = (audio.currentTime / audio.duration) * 100
  progress.value = pct
  updateSlider(progress, pct)
  document.querySelector('#current-time').textContent = formatTime(audio.currentTime)
})

audio.addEventListener('loadedmetadata', () => {
  const track = tracks[currentIndex]
  if (!track) return
  track.duration = audio.duration
  document.querySelector('#duration').textContent = formatTime(audio.duration)
  updateQueue()
})

audio.addEventListener('play', () => {
  rememberTrack()
  updatePlayState()
})
audio.addEventListener('pause', updatePlayState)
audio.addEventListener('ended', () => {
  if (repeatMode === 2) playTrack(currentIndex, true)
  else if (repeatMode === 0 && currentIndex === tracks.length - 1 && !isShuffling) updatePlayState()
  else playNext()
})

// Volume
const volume = document.querySelector('#volume')
const volumeButton = document.querySelector('#volume-button')
let prevVol = Number(volume.value)
audio.volume = prevVol

volume.addEventListener('input', () => {
  audio.volume = Number(volume.value)
  if (audio.volume > 0) prevVol = audio.volume
  updateSlider(volume, audio.volume * 100)
  const muted = audio.volume === 0
  volumeButton.innerHTML = icon(muted ? 'mute' : 'volume', 16)
})

volumeButton.addEventListener('click', () => {
  volume.value = audio.volume > 0 ? 0 : prevVol
  volume.dispatchEvent(new Event('input'))
})

// Local audio file importer
const fileUploader = document.querySelector('#file-uploader')
const handleFiles = (files) => {
  const added = Array.from(files).filter(f => f.type.startsWith('audio/')).map((file, i) => ({
    id: `file-${Date.now()}-${i}`,
    index: tracks.length + i,
    title: file.name.replace(/\.[^/.]+$/, ''),
    file: file.name,
    src: URL.createObjectURL(file),
    duration: null,
  }))

  if (added.length) {
    tracks = [...tracks, ...added]
    document.querySelector('#library-count').textContent = `${tracks.length} tracks`
    renderTracks()
    showToast(`Imported ${added.length} track${added.length > 1 ? 's' : ''}!`)
    if (currentIndex === -1) playTrack(0, true)
  }
}

fileUploader?.addEventListener('change', (e) => handleFiles(e.target.files))

window.addEventListener('dragover', (e) => e.preventDefault())
window.addEventListener('drop', (e) => {
  e.preventDefault()
  if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files)
})

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement) return
  if (e.code === 'Space') {
    e.preventDefault()
    togglePlay()
  } else if (e.code === 'ArrowRight' && currentIndex >= 0) {
    audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || audio.currentTime)
  } else if (e.code === 'ArrowLeft' && currentIndex >= 0) {
    audio.currentTime = Math.max(0, audio.currentTime - 5)
  } else if (e.key === '/') {
    e.preventDefault()
    searchInput.focus()
  }
})


// Initialize library
const init = async () => {
  try {
    const baseUrl = import.meta.env.BASE_URL
    const res = await fetch(`${baseUrl}songs/manifest.json`)
    if (!res.ok) throw new Error(`Song catalog request failed (${res.status}).`)
    const json = await res.json()
    if (!Array.isArray(json)) throw new Error('Song catalog must be a list.')
    tracks = json.map((f, i) => ({
      id: f.file,
      index: i,
      title: f.title || `Track ${String(i + 1).padStart(3, '0')}`,
      artist: f.artist || '',
      file: f.file,
      src: f.src || `${baseUrl}songs/${encodeURIComponent(f.file)}`,
      duration: null,
    }))
  } catch (error) {
    console.error('Could not load the song catalog.', error)
    tracks = []
    showToast('Could not load songs. Check that the song catalog is available.')
  }

  recentIds = recentIds.filter((id) => tracks.some((t) => t.id === id))
  for (const id of [...favoriteIds]) {
    if (!tracks.some((t) => t.id === id)) favoriteIds.delete(id)
  }

  document.querySelector('#library-count').textContent = `${tracks.length} tracks`
  renderTracks()
  updateQueue()
}

init()