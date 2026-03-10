// engine-cache-sw.js - Service Worker for caching Stockfish engine
const CACHE_NAME = 'stockfish-engine-v1';
const ENGINE_FILES = [
  './stockfish-18-lite-single.js',
  './stockfish-18-lite-single.wasm'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ENGINE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  if (ENGINE_FILES.some(file => event.request.url.includes(file))) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});