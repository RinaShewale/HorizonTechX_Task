/**
 * Unbound — Curated Spatial Art Gallery & Exhibition Engine
 * Horizon TechX Frontend Showcase
 * Simple, Elegant, Fluid Animations, Zero-Defect Architecture
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 12 Curated Masterpieces across 6 Historical Art Movements
export const ARTWORKS = [
  {
    id: 'scream',
    title: 'The Scream',
    artist: 'Edvard Munch',
    year: 1893,
    category: 'Expressionism',
    medium: 'Oil, tempera, pastel on cardboard',
    dimensions: '91 cm × 73.5 cm',
    location: 'National Museum, Oslo',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
    description: 'An iconic exploration of existential angst, capturing an agonized figure against an apocalyptic blood-red Oslo sky. Munch translates profound psychological tension into swirling chromatic rhythms.',
    accentColor: '#d65a31'
  },
  {
    id: 'wanderer',
    title: 'Wanderer above the Sea of Fog',
    artist: 'Caspar David Friedrich',
    year: 1818,
    category: 'Romanticism',
    medium: 'Oil on canvas',
    dimensions: '94.8 cm × 74.8 cm',
    location: 'Hamburger Kunsthalle, Hamburg',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'The defining icon of Romantic solitude, featuring an introspective traveler standing upon a precipitous alpine peak, gazing into a boundless sea of mountain clouds in awe of nature’s majestic mystery.',
    accentColor: '#7a8b99'
  },
  {
    id: 'starry-night',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: 1889,
    category: 'Post-Impressionism',
    medium: 'Oil on canvas',
    dimensions: '73.7 cm × 92.1 cm',
    location: 'Museum of Modern Art, New York',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80',
    description: 'Painted from Van Gogh’s asylum room in Saint-Rémy-de-Provence, translating nocturnal silence into an incandescent cosmic swirl of rolling blues, fiery yellow stars, and an impassioned cypress tree.',
    accentColor: '#2b4c7e'
  },
  {
    id: 'sunflowers',
    title: 'Sunflowers',
    artist: 'Vincent van Gogh',
    year: 1888,
    category: 'Post-Impressionism',
    medium: 'Oil on canvas',
    dimensions: '92.1 cm × 73 cm',
    location: 'National Gallery, London',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80',
    description: 'A luminous celebration of radiant chrome yellow and golden ochre, utilizing expressive impasto brush strokes to capture the fleeting bloom, maturity, and decay of natural life.',
    accentColor: '#e5a93c'
  },
  {
    id: 'grande-jatte',
    title: 'A Sunday on La Grande Jatte',
    artist: 'Georges Seurat',
    year: 1886,
    category: 'Post-Impressionism',
    medium: 'Oil on canvas',
    dimensions: '207.5 cm × 308.1 cm',
    location: 'Art Institute of Chicago',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400&q=80',
    description: 'The monumental pinnacle of Pointillism, uniting optics and classical serenity through millions of tiny, carefully juxtaposed pure color dots along the banks of the Seine.',
    accentColor: '#3d6e50'
  },
  {
    id: 'mona-lisa',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    year: 1503,
    category: 'Renaissance',
    medium: 'Oil on poplar panel',
    dimensions: '77 cm × 53 cm',
    location: 'Musée du Louvre, Paris',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=400&q=80',
    description: 'The world’s most celebrated portrait, renowned for Leonardo’s revolutionary sfumato technique, delicate atmospheric perspective, and Lisa Gherardini’s enigmatically smiling gaze.',
    accentColor: '#7a5a3a'
  },
  {
    id: 'birth-of-venus',
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    year: 1485,
    category: 'Renaissance',
    medium: 'Tempera on canvas',
    dimensions: '172.5 cm × 278.5 cm',
    location: 'Uffizi Gallery, Florence',
    image: 'https://images.unsplash.com/photo-1789700537304-c291bfc38ad9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
    thumb: 'https://images.unsplash.com/photo-1789700537304-c291bfc38ad9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
    description: 'An ethereal Neoplatonic celebration of divine beauty, showing Venus emerging from the sea foam upon a giant seashell, guided ashore by Zephyrs drifting through raining rose petals.',
    accentColor: '#c59574'
  },
  {
    id: 'creation-of-adam',
    title: 'The Creation of Adam',
    artist: 'Michelangelo Buonarroti',
    year: 1512,
    category: 'Renaissance',
    medium: 'Fresco',
    dimensions: '280 cm × 570 cm',
    location: 'Sistine Chapel, Vatican Museums',
    image: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=400&q=80',
    description: 'The monumental core of the Sistine Chapel ceiling, crystallizing the spark of divine life in the near-touch of fingertips between God and the first man with incomparable anatomical grace.',
    accentColor: '#b08b62'
  },
  {
    id: 'girl-pearl-earring',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: 1665,
    category: 'Renaissance',
    medium: 'Oil on canvas',
    dimensions: '44.5 cm × 39 cm',
    location: 'Mauritshuis, The Hague',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=400&q=80',
    description: 'An intimate Dutch Golden Age masterwork capturing a young maiden in an exotic blue turban glancing over her shoulder, highlighted by an astonishingly luminous teardrop pearl.',
    accentColor: '#2b4d59'
  },
  {
    id: 'water-lilies',
    title: 'Water Lilies',
    artist: 'Claude Monet',
    year: 1916,
    category: 'Impressionism',
    medium: 'Oil on canvas',
    dimensions: '200 cm × 200 cm',
    location: 'Musée de l\'Orangerie, Paris',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=400&q=80',
    description: 'Monet’s meditative vision eliminates horizon lines, merging sky, water, reflections, and floating lily blossoms into an immersive, ever-shifting poem of atmospheric color and light.',
    accentColor: '#2f5d54'
  },
  {
    id: 'the-kiss',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    year: 1908,
    category: 'Modern Art',
    medium: 'Oil and gold leaf on canvas',
    dimensions: '180 cm × 180 cm',
    location: 'Österreichische Galerie Belvedere, Vienna',
    image: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=400&q=80',
    description: 'The golden zenith of the Vienna Secession, enveloping embracing lovers in an opulent tapestry of shimmering gold leaf, geometric symbols, and wildflower meadow radiance.',
    accentColor: '#d4af37'
  },
  {
    id: 'great-wave',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    year: 1831,
    category: 'Modern Art',
    medium: 'Woodblock print; ink and color on paper',
    dimensions: '25.7 cm × 37.8 cm',
    location: 'Metropolitan Museum of Art, New York',
    image: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=400&q=80',
    description: 'An immortal masterwork of Japanese ukiyo-e printmaking, framing sacred Mount Fuji within the cresting, talon-like foam of a roaring Prussian blue wave.',
    accentColor: '#1a3e5c'
  }
];

// Curatorial Museum-Grade Fallback Artwork (renders gracefully anywhere)
export function generateArtSvg(title, artist, year, accentColor) {
  const t = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const a = artist.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <radialGradient id="grad" cx="50%" cy="38%" r="65%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.6"/>
        <stop offset="60%" stop-color="#121218" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#08080b"/>
      </radialGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f3dfa2"/>
        <stop offset="50%" stop-color="#c5a059"/>
        <stop offset="100%" stop-color="#7e602e"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(%23grad)"/>
    <rect x="36" y="36" width="728" height="928" fill="none" stroke="url(%23gold)" stroke-width="1.8" opacity="0.65"/>
    <rect x="52" y="52" width="696" height="896" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.3"/>
    <circle cx="400" cy="400" r="160" fill="none" stroke="url(%23gold)" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.45"/>
    <polygon points="400,260 490,420 310,420" fill="none" stroke="url(%23gold)" stroke-width="1.5" opacity="0.5"/>
    <text x="400" y="690" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="42" font-weight="600" fill="%23f4ede2" letter-spacing="1">${t}</text>
    <text x="400" y="745" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="19" font-weight="500" fill="%23c5a059" letter-spacing="3">${a.toUpperCase()}</text>
    <text x="400" y="790" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="%238a8a98" letter-spacing="2">EST. ${year}</text>
    <text x="400" y="870" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-size="17" fill="%23c5a059" opacity="0.8">Unbound Curatorial Archive</text>
  </svg>`;
}

// Global Gallery Store
class GalleryStore {
  constructor() {
    this.artworks = [...ARTWORKS];
    this.filtered = [...ARTWORKS];
    this.category = 'all';
    this.search = '';
    this.sort = 'featured';
    this.viewMode = 'grid';

    const savedFavs = (typeof window !== 'undefined' && window.localStorage)
      ? (() => { try { return JSON.parse(localStorage.getItem('unbound_favs') || '[]'); } catch(_) { return []; } })()
      : [];
    this.favorites = new Set(savedFavs);

    // Carousel Physics
    this.currentIndex = 0;
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.stepAngle = 360 / ARTWORKS.length; // 30 deg
    this.isDragging = false;
    this.startX = 0;
    this.lastX = 0;
    this.dragVelocity = 0;
    this.isPlaying = true;

    // Lightbox
    this.lightboxIndex = 0;
    this.isLightboxOpen = false;
    this.isZoomed = false;
  }

  toggleFav(id) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('unbound_favs', JSON.stringify([...this.favorites]));
      }
    } catch (_) {}
  }
}

const store = new GalleryStore();

// Elegant Toast Notification
export function showToast(message, duration = 2800) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}



/**
 * Elegant 3D Concave Panoramic Cylinder Carousel
 * Smooth GPU Mathematical Projection (Prevents 3D clipping & backface clutter)
 */
function init3DCylinder() {
  const stage = document.getElementById('spatial-stage');
  const track = document.getElementById('spatial-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const playPauseBtn = document.getElementById('carousel-play-pause-btn');
  const titleEl = document.getElementById('active-artwork-title');
  const artistEl = document.getElementById('active-artwork-artist');

  if (!stage || !track) return;

  track.innerHTML = '';
  store.artworks.forEach((art, index) => {
    const card = document.createElement('div');
    card.className = 'cylinder-card';
    card.dataset.index = index;
    card.dataset.id = art.id;

    card.innerHTML = `
      <div class="cylinder-card-frame">
        <div class="cylinder-card-shine"></div>
        <div class="cylinder-img-box">
          <img src="${art.thumb || art.image}" alt="${art.title}" class="cylinder-img" loading="lazy" />
        </div>
        <div class="cylinder-card-badge">${art.category}</div>
        <div class="cylinder-card-info">
          <h3 class="cylinder-card-title">${art.title}</h3>
          <p class="cylinder-card-artist">${art.artist} • ${art.year}</p>
        </div>
        <div class="cylinder-card-action">
          <span>Inspect Artwork ◈</span>
        </div>
      </div>
    `;

    const img = card.querySelector('.cylinder-img');
    img.addEventListener('error', () => {
      img.src = generateArtSvg(art.title, art.artist, art.year, art.accentColor);
    });

    card.addEventListener('click', () => {
      const currentNorm = ((-store.currentAngle % 360) + 360) % 360;
      const targetCardAngle = index * store.stepAngle;
      let diff = Math.abs(currentNorm - targetCardAngle);
      if (diff > 180) diff = 360 - diff;

      if (diff < 8) {
        window.openLightbox(index);
      } else {
        rotateToIndex(index);
      }
    });

    track.appendChild(card);
  });

  const cards = Array.from(track.querySelectorAll('.cylinder-card'));

  function rotateToIndex(idx) {
    const targetBase = -idx * store.stepAngle;
    let diff = (targetBase - store.currentAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    store.targetAngle = store.currentAngle + diff;

  }

  function updateActiveIndicator(idx) {
    if (store.currentIndex === idx) return;
    store.currentIndex = idx;
    const art = store.artworks[idx];
    if (!art) return;

    if (titleEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(4px)';
      setTimeout(() => {
        titleEl.textContent = art.title;
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 140);
    }

    if (artistEl) {
      artistEl.style.opacity = '0';
      setTimeout(() => {
        artistEl.textContent = `• ${art.artist}, ${art.year}`;
        artistEl.style.opacity = '1';
      }, 140);
    }

    cards.forEach((c, i) => {
      if (i === idx) {
        c.classList.add('is-active');
      } else {
        c.classList.remove('is-active');
      }
    });
  }

  function renderCarouselFrame() {
    const stageWidth = stage.clientWidth || window.innerWidth;
    const isMobile = stageWidth < 600;
    const isTablet = stageWidth < 900;

    const spreadWidth = isMobile ? 260 : (isTablet ? 420 : 640);
    const depthCurve = isMobile ? 120 : (isTablet ? 190 : 260);

    if (isNaN(store.currentAngle)) store.currentAngle = 0;
    if (isNaN(store.targetAngle)) store.targetAngle = 0;

    // Periodically normalize angles to prevent precision loss during long sessions
    if (!store.isDragging) {
      if (store.currentAngle < -36000 || store.currentAngle > 36000) {
        const offset = store.currentAngle % 360;
        store.targetAngle = (store.targetAngle - store.currentAngle) + offset;
        store.currentAngle = offset;
      }
    }

    const diff = store.targetAngle - store.currentAngle;
    store.currentAngle += diff * 0.085;

    const normalizedAngle = ((-store.currentAngle % 360) + 360) % 360;
    let centerIndex = Math.round(normalizedAngle / store.stepAngle) % store.artworks.length;
    if (centerIndex < 0) centerIndex += store.artworks.length;
    updateActiveIndicator(centerIndex);

    cards.forEach((card, i) => {
      const baseAngle = i * store.stepAngle;
      let relAngle = (baseAngle + store.currentAngle) % 360;
      if (relAngle > 180) relAngle -= 360;
      if (relAngle < -180) relAngle += 360;

      if (Math.abs(relAngle) > 95) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.visibility = 'hidden';
        return;
      }

      card.style.visibility = 'visible';
      card.style.pointerEvents = 'auto';

      const rad = (relAngle * Math.PI) / 180;
      const x = Math.sin(rad) * spreadWidth;
      const z = -(1 - Math.cos(rad)) * depthCurve;
      const rotateY = -relAngle * 0.62;
      const progress = Math.min(1, Math.abs(relAngle) / 90);
      const scale = Math.max(0.68, 1 - progress * 0.32);
      const opacity = Math.max(0.08, 1 - Math.pow(progress, 1.35) * 0.88);
      const zIndex = Math.round(100 - Math.abs(relAngle));

      card.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = zIndex;
    });
  }

  let lastTime = performance.now();
  function loop(time) {
    lastTime = time;

    if (!store.isDragging && store.isPlaying) {
      store.targetAngle -= 0.14;
    }

    renderCarouselFrame();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function onPointerDown(clientX) {
    if (typeof clientX !== 'number' || isNaN(clientX)) return;
    store.isDragging = true;
    store.startX = clientX;
    store.lastX = clientX;
    store.dragVelocity = 0;
    track.classList.add('is-dragging');
  }

  function onPointerMove(clientX) {
    if (!store.isDragging || typeof clientX !== 'number' || isNaN(clientX)) return;
    const deltaX = clientX - store.lastX;
    if (isNaN(deltaX)) return;
    store.lastX = clientX;
    const angleDelta = deltaX * 0.26;
    store.currentAngle += angleDelta;
    store.targetAngle = store.currentAngle;
    store.dragVelocity = angleDelta;
  }

  function onPointerUp() {
    if (!store.isDragging) return;
    store.isDragging = false;
    track.classList.remove('is-dragging');

    const projectedAngle = store.currentAngle + store.dragVelocity * 8;
    const norm = ((-projectedAngle % 360) + 360) % 360;
    const nearest = Math.round(norm / store.stepAngle) % store.artworks.length;
    rotateToIndex(nearest);
  }

  stage.addEventListener('mousedown', (e) => {
    if (e.button === 0) onPointerDown(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (store.isDragging) {
      e.preventDefault();
      onPointerMove(e.clientX);
    }
  });

  window.addEventListener('mouseup', () => {
    if (store.isDragging) onPointerUp();
  });

  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onPointerDown(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (store.isDragging && e.touches.length === 1) onPointerMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (store.isDragging) onPointerUp();
  });

  let wheelTimer;
  let autoResumeTimer;
  stage.addEventListener('wheel', (e) => {
    // Only intercept if horizontal swipe or holding Shift
    // Allow normal page scrolling so scrolling to top and down the page is completely smooth
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      const wheelDelta = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 0.12;
      store.targetAngle -= wheelDelta;
      store.isPlaying = false;
      updatePlayPauseIcon();

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        const norm = ((-store.targetAngle % 360) + 360) % 360;
        const nearest = Math.round(norm / store.stepAngle) % store.artworks.length;
        rotateToIndex(nearest);
      }, 250);

      // Auto-resume infinite rotation after interaction
      clearTimeout(autoResumeTimer);
      autoResumeTimer = setTimeout(() => {
        store.isPlaying = true;
        updatePlayPauseIcon();
      }, 3000);
    }
  }, { passive: false });

  prevBtn?.addEventListener('click', () => {
    const nextIdx = (store.currentIndex - 1 + store.artworks.length) % store.artworks.length;
    rotateToIndex(nextIdx);
  });

  nextBtn?.addEventListener('click', () => {
    const nextIdx = (store.currentIndex + 1) % store.artworks.length;
    rotateToIndex(nextIdx);
  });

  function updatePlayPauseIcon() {
    if (!playPauseBtn) return;
    if (store.isPlaying) {
      playPauseBtn.setAttribute('title', 'Pause Rotation');
      playPauseBtn.setAttribute('aria-label', 'Pause Rotation');
      playPauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1.5"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1.5"></rect>
        </svg>
      `;
    } else {
      playPauseBtn.setAttribute('title', 'Play Rotation');
      playPauseBtn.setAttribute('aria-label', 'Play Rotation');
      playPauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <polygon points="6 4 20 12 6 20 6 4"></polygon>
        </svg>
      `;
    }
  }

  playPauseBtn?.addEventListener('click', () => {
    store.isPlaying = !store.isPlaying;
    updatePlayPauseIcon();
  });
}

/**
 * Explore Archive: Filter, Search, Sort & Responsive Layout
 */
function initArchive() {
  const grid = document.getElementById('gallery-grid');
  const emptyBox = document.getElementById('gallery-empty');
  const searchInput = document.getElementById('gallery-search-input');
  const searchClear = document.getElementById('search-clear-btn');
  const sortSelect = document.getElementById('gallery-sort-select');
  const filterPills = document.querySelectorAll('.filter-pill-btn');
  const statusEl = document.getElementById('gallery-status');
  const gridBtn = document.getElementById('view-grid-btn');
  const compactBtn = document.getElementById('view-compact-btn');
  const prevNav = document.getElementById('gallery-prev-btn');
  const nextNav = document.getElementById('gallery-next-btn');
  const resetBtn = document.getElementById('btn-reset-filters');

  if (!grid) return;

  function syncCategoryCounts() {
    const counts = { all: store.artworks.length };
    store.artworks.forEach(art => {
      const key = art.category.toLowerCase().replace(/\s+/g, '-');
      counts[key] = (counts[key] || 0) + 1;
    });

    Object.entries(counts).forEach(([key, count]) => {
      const badge = document.getElementById(`count-${key}`);
      if (badge) badge.textContent = count;
    });
  }
  syncCategoryCounts();

  function applyFilterAndSort() {
    let list = [...store.artworks];

    if (store.category !== 'all') {
      list = list.filter(art => art.category.toLowerCase() === store.category.toLowerCase());
    }

    if (store.search.trim()) {
      const q = store.search.toLowerCase().trim();
      list = list.filter(art =>
        art.title.toLowerCase().includes(q) ||
        art.artist.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        art.medium.toLowerCase().includes(q) ||
        art.location.toLowerCase().includes(q) ||
        art.year.toString().includes(q)
      );
    }

    switch (store.sort) {
      case 'year-asc':
        list.sort((a, b) => a.year - b.year);
        break;
      case 'year-desc':
        list.sort((a, b) => b.year - a.year);
        break;
      case 'title-asc':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        break;
    }

    store.filtered = list;
    renderGrid();
  }

  function renderGrid() {
    grid.innerHTML = '';
    const items = store.filtered;

    if (statusEl) {
      statusEl.textContent = `Showing ${items.length} ${items.length === 1 ? 'masterpiece' : 'masterpieces'}`;
    }

    if (items.length === 0) {
      emptyBox?.classList.remove('hidden');
      grid.style.display = 'none';
      return;
    } else {
      emptyBox?.classList.add('hidden');
      grid.style.display = store.viewMode === 'grid' ? 'grid' : 'flex';
      grid.className = store.viewMode === 'grid' ? 'gallery-grid' : 'gallery-grid compact-view';
    }

    items.forEach((art, index) => {
      const card = document.createElement('article');
      card.className = 'artwork-card';
      card.dataset.id = art.id;
      card.dataset.index = index;

      const isFav = store.favorites.has(art.id);

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-visual-wrapper">
            <img src="${art.thumb || art.image}" alt="${art.title} by ${art.artist}" class="card-image" loading="lazy" />
            <div class="card-visual-overlay"></div>
            
            <button class="card-fav-btn ${isFav ? 'active' : ''}" aria-label="Favorite artwork" data-id="${art.id}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <span class="card-movement-badge">${art.category}</span>
            <span class="card-year-badge">${art.year}</span>

            <div class="card-hover-action">
              <button class="card-inspect-btn">
                <span>Examine Canvas</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="card-content-wrapper">
            <div class="card-main-meta">
              <h3 class="card-title">${art.title}</h3>
              <p class="card-artist">${art.artist}</p>
            </div>
            
            <div class="card-sub-specs">
              <span class="spec-chip" title="Medium: ${art.medium}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span>${art.medium}</span>
              </span>
              <span class="spec-chip" title="Location: ${art.location}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${art.location}</span>
              </span>
            </div>
          </div>
        </div>
      `;

      const img = card.querySelector('.card-image');
      img.addEventListener('error', () => {
        img.src = generateArtSvg(art.title, art.artist, art.year, art.accentColor);
      });

      const inner = card.querySelector('.card-inner');
      card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        inner.style.transform = `perspective(800px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });

      const fav = card.querySelector('.card-fav-btn');
      fav.addEventListener('click', (e) => {
        e.stopPropagation();
        store.toggleFav(art.id);
        const active = store.favorites.has(art.id);
        fav.classList.toggle('active', active);
        fav.querySelector('svg').setAttribute('fill', active ? 'currentColor' : 'none');
        showToast(active ? `Saved "${art.title}" to Favorites ◈` : `Removed "${art.title}" from Favorites`);
        playTick();
      });

      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-fav-btn')) return;
        window.openLightbox(index);
      });

      grid.appendChild(card);
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      store.category = pill.dataset.category || 'all';
      applyFilterAndSort();
    });
  });

  let searchTimer;
  searchInput?.addEventListener('input', (e) => {
    const val = e.target.value;
    store.search = val;
    if (searchClear) searchClear.style.display = val ? 'inline-flex' : 'none';

    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      applyFilterAndSort();
    }, 160);
  });

  searchClear?.addEventListener('click', () => {
    searchInput.value = '';
    store.search = '';
    searchClear.style.display = 'none';
    searchInput.focus();
    applyFilterAndSort();
  });

  sortSelect?.addEventListener('change', (e) => {
    store.sort = e.target.value;
    applyFilterAndSort();
  });

  gridBtn?.addEventListener('click', () => {
    store.viewMode = 'grid';
    gridBtn.classList.add('active');
    compactBtn?.classList.remove('active');
    renderGrid();
  });

  compactBtn?.addEventListener('click', () => {
    store.viewMode = 'compact';
    compactBtn.classList.add('active');
    gridBtn?.classList.remove('active');
    renderGrid();
  });

  prevNav?.addEventListener('click', () => {
    if (store.filtered.length > 0) window.openLightbox(store.filtered.length - 1);
  });

  nextNav?.addEventListener('click', () => {
    if (store.filtered.length > 0) window.openLightbox(0);
  });

  resetBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    store.search = '';
    if (searchClear) searchClear.style.display = 'none';

    filterPills.forEach(p => {
      const isAll = p.dataset.category === 'all';
      p.classList.toggle('active', isAll);
      p.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });
    store.category = 'all';

    if (sortSelect) sortSelect.value = 'featured';
    store.sort = 'featured';

    applyFilterAndSort();
    showToast('Filters reset to Full Showcase');
  });

  applyFilterAndSort();
}

/**
 * Fullscreen Cinematic Lightbox & Museum Zoom
 */
function initLightbox() {
  const box = document.getElementById('lightbox');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const zoomBtn = document.getElementById('lightbox-zoom-btn');
  const imgEl = document.getElementById('lightbox-img');
  const imgBox = document.getElementById('lightbox-image-wrapper');
  const counter = document.getElementById('lightbox-counter');
  const title = document.getElementById('lightbox-title');
  const artist = document.getElementById('lightbox-artist');
  const category = document.getElementById('lightbox-category');
  const year = document.getElementById('lightbox-year');
  const medium = document.getElementById('lightbox-medium');
  const dims = document.getElementById('lightbox-dims');
  const loc = document.getElementById('lightbox-location');
  const desc = document.getElementById('lightbox-desc');
  const favBtn = document.getElementById('lightbox-fav-btn');
  const favLabel = document.getElementById('lightbox-fav-label');
  const shareBtn = document.getElementById('lightbox-share-btn');
  const strip = document.getElementById('lightbox-thumbs-track');

  if (!box || !imgEl) return;

  window.openLightbox = function(index) {
    const list = store.filtered.length > 0 ? store.filtered : store.artworks;
    if (index < 0) index = list.length - 1;
    if (index >= list.length) index = 0;

    store.lightboxIndex = index;
    store.isLightboxOpen = true;
    store.isZoomed = false;
    imgBox?.classList.remove('is-zoomed');

    renderContent();
    renderStrip();

    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

  };

  function closeLightbox() {
    store.isLightboxOpen = false;
    store.isZoomed = false;
    imgBox?.classList.remove('is-zoomed');
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderContent() {
    const list = store.filtered.length > 0 ? store.filtered : store.artworks;
    const art = list[store.lightboxIndex];
    if (!art) return;

    if (counter) {
      counter.textContent = `${(store.lightboxIndex + 1).toString().padStart(2, '0')} / ${list.length.toString().padStart(2, '0')}`;
    }

    if (title) title.textContent = art.title;
    if (artist) artist.textContent = art.artist;
    if (category) category.textContent = art.category;
    if (year) year.textContent = art.year;
    if (medium) medium.textContent = art.medium;
    if (dims) dims.textContent = art.dimensions;
    if (loc) loc.textContent = art.location;
    if (desc) desc.textContent = art.description;

    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.97)';
    imgEl.style.transformOrigin = 'center center';

    const testImg = new Image();
    testImg.src = art.image;
    testImg.onload = () => {
      imgEl.src = art.image;
      imgEl.alt = `${art.title} by ${art.artist}`;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    };
    testImg.onerror = () => {
      imgEl.src = generateArtSvg(art.title, art.artist, art.year, art.accentColor);
      imgEl.alt = art.title;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    };

    const isFav = store.favorites.has(art.id);
    if (favBtn) {
      favBtn.classList.toggle('active', isFav);
      favBtn.querySelector('svg').setAttribute('fill', isFav ? 'currentColor' : 'none');
      if (favLabel) favLabel.textContent = isFav ? 'Favorited' : 'Favorite';
    }

    highlightStrip();
  }

  function renderStrip() {
    if (!strip) return;
    strip.innerHTML = '';
    const list = store.filtered.length > 0 ? store.filtered : store.artworks;

    list.forEach((art, idx) => {
      const thumb = document.createElement('button');
      thumb.className = `lightbox-thumb-item ${idx === store.lightboxIndex ? 'active' : ''}`;
      thumb.setAttribute('aria-label', `View ${art.title}`);
      thumb.innerHTML = `<img src="${art.thumb || art.image}" alt="${art.title}" loading="lazy" />`;

      const tImg = thumb.querySelector('img');
      tImg.addEventListener('error', () => {
        tImg.src = generateArtSvg(art.title, art.artist, art.year, art.accentColor);
      });

      thumb.addEventListener('click', () => {
        store.lightboxIndex = idx;
        store.isZoomed = false;
        imgBox?.classList.remove('is-zoomed');
        renderContent();
        playTick();
      });

      strip.appendChild(thumb);
    });

    highlightStrip();
  }

  function highlightStrip() {
    if (!strip) return;
    const thumbs = strip.querySelectorAll('.lightbox-thumb-item');
    thumbs.forEach((th, idx) => {
      if (idx === store.lightboxIndex) {
        th.classList.add('active');
        th.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        th.classList.remove('active');
      }
    });
  }

  function toggleZoom() {
    store.isZoomed = !store.isZoomed;
    imgBox?.classList.toggle('is-zoomed', store.isZoomed);
    zoomBtn?.classList.toggle('active', store.isZoomed);
    if (!store.isZoomed) {
      imgEl.style.transform = 'scale(1)';
      imgEl.style.transformOrigin = 'center center';
    } else {
      imgEl.style.transform = 'scale(2.2)';
      showToast('Zoom Mode: Pan cursor over canvas ◈');
    }
  }

  imgBox?.addEventListener('mousemove', (e) => {
    if (!store.isZoomed) return;
    const rect = imgBox.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imgEl.style.transformOrigin = `${x}% ${y}%`;
  });

  imgBox?.addEventListener('dblclick', toggleZoom);
  zoomBtn?.addEventListener('click', toggleZoom);

  function step(dir) {
    const list = store.filtered.length > 0 ? store.filtered : store.artworks;
    store.lightboxIndex = (store.lightboxIndex + dir + list.length) % list.length;
    store.isZoomed = false;
    imgBox?.classList.remove('is-zoomed');
    renderContent();

  }

  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));
  closeBtn?.addEventListener('click', closeLightbox);
  backdrop?.addEventListener('click', closeLightbox);

  favBtn?.addEventListener('click', () => {
    const list = store.filtered.length > 0 ? store.filtered : store.artworks;
    const art = list[store.lightboxIndex];
    if (!art) return;

    store.toggleFav(art.id);
    const isFav = store.favorites.has(art.id);
    favBtn.classList.toggle('active', isFav);
    favBtn.querySelector('svg').setAttribute('fill', isFav ? 'currentColor' : 'none');
    if (favLabel) favLabel.textContent = isFav ? 'Favorited' : 'Favorite';

    const cardFav = document.querySelector(`.artwork-card[data-id="${art.id}"] .card-fav-btn`);
    if (cardFav) {
      cardFav.classList.toggle('active', isFav);
      cardFav.querySelector('svg').setAttribute('fill', isFav ? 'currentColor' : 'none');
    }

    showToast(isFav ? `Saved "${art.title}" to Favorites ◈` : `Removed "${art.title}" from Favorites`);
  });

  shareBtn?.addEventListener('click', () => {
    const list = store.filtered.length > 0 ? store.filtered : store.artworks;
    const art = list[store.lightboxIndex];
    if (!art) return;

    const url = window.location.href.split('#')[0] + '#' + art.id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Direct Masterpiece Link Copied ◈');
      }).catch(() => {
        showToast(`Artwork: ${art.title}`);
      });
    } else {
      showToast(`Artwork: ${art.title}`);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (store.isLightboxOpen) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key.toLowerCase() === 'z') toggleZoom();
    } else {
      if (e.key === 'ArrowLeft') {
        const nextIdx = (store.currentIndex - 1 + store.artworks.length) % store.artworks.length;
        const targetBase = -nextIdx * store.stepAngle;
        store.targetAngle = targetBase;
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (store.currentIndex + 1) % store.artworks.length;
        const targetBase = -nextIdx * store.stepAngle;
        store.targetAngle = targetBase;
      }
    }
  });

  let touchX = 0;
  box.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
  }, { passive: true });

  box.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchX;
    if (Math.abs(diff) > 48 && !store.isZoomed) {
      if (diff > 0) step(-1);
      else step(1);
    }
  });
}

/**
 * Auxiliary Dialogs (Contact, Events, Visit) & Mobile Nav
 */
function initAuxModals() {
  const mobileBtn = document.getElementById('nav-mobile-toggle');
  const navLinks = document.getElementById('nav-pill-links');

  mobileBtn?.addEventListener('click', () => {
    const open = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', !open);
    navLinks?.classList.toggle('is-open', !open);
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileBtn?.setAttribute('aria-expanded', 'false');
      navLinks?.classList.remove('is-open');
    });
  });

  const contactBtn = document.getElementById('nav-contact-btn');
  const eventsBtn = document.getElementById('nav-events-btn');
  const visitBtn = document.getElementById('nav-visit-btn');

  const contactModal = document.getElementById('contact-modal');
  const eventsModal = document.getElementById('events-modal');
  const visitModal = document.getElementById('visit-modal');

  function open(modal) {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playTick();
  }

  function close(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  contactBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    open(contactModal);
  });

  eventsBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    open(eventsModal);
  });

  visitBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    open(visitModal);
  });

  [contactModal, eventsModal, visitModal].forEach(m => {
    if (!m) return;
    m.querySelector('.modal-close-btn')?.addEventListener('click', () => close(m));
    m.querySelector('.modal-backdrop')?.addEventListener('click', () => close(m));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [contactModal, eventsModal, visitModal].forEach(m => {
        if (m?.classList.contains('is-open')) close(m);
      });
    }
  });

  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-form-success');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || 'Guest';
    form.style.display = 'none';
    if (success) {
      success.classList.remove('hidden');
      success.textContent = `Thank you, ${name}. Your curatorial inquiry has been received.`;
    }
    showToast(`Inquiry sent from ${name} ◈`);

    setTimeout(() => {
      close(contactModal);
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        success?.classList.add('hidden');
      }, 400);
    }, 2400);
  });

  document.querySelectorAll('.event-rsvp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Reserved ✓';
      btn.classList.add('confirmed');
      showToast('Invitation Reserved ◈');
    });
  });

  const heroSec = document.getElementById('hero-section');
  const exploreSec = document.getElementById('explore-section');
  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 220;
    const exploreTop = exploreSec ? exploreSec.offsetTop : 0;

    const homeLink = document.querySelector('.nav-pill-link[href="#hero-section"]');
    const exploreLink = document.querySelector('.nav-pill-link[href="#explore-section"]');

    if (pos >= exploreTop) {
      homeLink?.classList.remove('active');
      exploreLink?.classList.add('active');
    } else {
      exploreLink?.classList.remove('active');
      homeLink?.classList.add('active');
    }
  }, { passive: true });
}

/**
 * Professional GSAP ScrollTrigger Animations for All Sections
 */
function initScrollAnimations() {
  // --- Hero Section Entrance ---
  const heroTimeline = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 1.2 }
  });

  heroTimeline
    .from('.hero-eyebrow', {
      y: 25,
      opacity: 0,
      duration: 0.8,
      clearProps: 'all'
    })
    .from('.hero-headline', {
      y: 35,
      opacity: 0,
      duration: 0.9,
      clearProps: 'all'
    }, '-=0.5')
    .from('.hero-subtext', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      clearProps: 'all'
    }, '-=0.6')
    .from('.hero-spatial-carousel', {
      y: 30,
      opacity: 0,
      duration: 1,
      clearProps: 'transform,opacity'
    }, '-=0.5')
    .from('.hero-bottom-bar', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      clearProps: 'all'
    }, '-=0.4');

  // --- Hero Header Subtle Parallax Fade ---
  gsap.to('.hero-header-text', {
    scrollTrigger: {
      trigger: '#hero-section',
      start: 'top top',
      end: 'bottom 45%',
      scrub: 1
    },
    y: -50,
    opacity: 0.2,
    ease: 'none'
  });

  // --- Navigation Floating Entrance ---
  gsap.from('.top-nav-header', {
    y: -40,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out'
  });

  // --- Explore Section Intro ---
  gsap.from('.section-intro .spatial-badge', {
    scrollTrigger: {
      trigger: '.section-intro',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  });

  gsap.from('.section-heading', {
    scrollTrigger: {
      trigger: '.section-intro',
      start: 'top 82%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.section-subtext', {
    scrollTrigger: {
      trigger: '.section-intro',
      start: 'top 78%',
      toggleActions: 'play none none none'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // --- Sticky Toolbar Slide In ---
  gsap.from('.gallery-sticky-toolbar', {
    scrollTrigger: {
      trigger: '.gallery-sticky-toolbar',
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  });

  // --- Gallery Grid Cards Staggered Reveal ---
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    let hasAnimated = false;
    const animateCards = () => {
      const cards = galleryGrid.querySelectorAll('.artwork-card');
      if (cards.length === 0) return;

      gsap.fromTo(cards, 
        { 
          y: 40, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        }
      );
    };

    ScrollTrigger.create({
      trigger: galleryGrid,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        hasAnimated = true;
        animateCards();
      }
    });

    const observer = new MutationObserver(() => {
      if (!hasAnimated && galleryGrid.children.length > 0) {
        ScrollTrigger.refresh();
      }
    });
    observer.observe(galleryGrid, { childList: true });
  }

  // --- Footer Reveal ---
  gsap.from('.gallery-footer', {
    scrollTrigger: {
      trigger: '.gallery-footer',
      start: 'top 92%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.footer-brand', {
    scrollTrigger: {
      trigger: '.gallery-footer',
      start: 'top 88%',
      toggleActions: 'play none none none'
    },
    x: -40,
    opacity: 0,
    duration: 0.9,
    delay: 0.15,
    ease: 'power3.out'
  });

  gsap.from('.footer-bottom', {
    scrollTrigger: {
      trigger: '.gallery-footer',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    y: 20,
    opacity: 0,
    duration: 0.7,
    delay: 0.3,
    ease: 'power3.out'
  });

  // --- Smooth Scroll Override for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetEl, offsetY: 0 },
        ease: 'power3.inOut'
      });
    });
  });
}

export function initGallery() {
  init3DCylinder();
  initArchive();
  initLightbox();
  initAuxModals();
  initScrollAnimations();
  console.log('%c◈ Unbound Spatial Gallery initialized gracefully', 'color: #c5a059; font-weight: 600;');
}