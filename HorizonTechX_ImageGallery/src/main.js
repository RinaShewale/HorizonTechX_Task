/**
 * Horizon TechX - Unbound Visual Gallery
 * Frontend Development Internship Showcase
 */
import { initGallery } from './gallary.js';

// Ensure stylesheet is loaded across all environments (Vite, Webpack, and native ES modules)
if (typeof document !== 'undefined' && !document.querySelector('link[href*="style.css"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./style.css', import.meta.url).href;
  document.head.appendChild(link);
}

// Initialize Gallery when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
}