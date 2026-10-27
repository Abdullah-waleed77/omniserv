/* OmniServ — service worker: caches the app shell so it opens fast and works offline.
   Bump CACHE_VERSION whenever the app files change so installed copies refresh. */

const CACHE_VERSION = 'omniserv-v1';

// Own files (relative to this worker, so it works in a GitHub Pages sub-folder).
const APP_FILES = [
  './', 'index.html', 'styles.css', 'app.js', 'data.js', 'i18n.js', 'illustrations.js',
  'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png',
  'icons/icon-maskable-192.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
];

// Third-party files the app needs offline (fetched best-effort; fonts are cached as they load).
const LIB_FILES = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(APP_FILES);
    await Promise.allSettled(LIB_FILES.map(async url => cache.put(url, await fetch(url, { mode: 'no-cors' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE_VERSION) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('tile.openstreetmap.org')) return; // map tiles always come from the network

  e.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(req, { ignoreSearch: true });
    const sameOrigin = url.origin === location.origin;

    // Refresh in the background; return the cached copy right away when there is one.
    const refresh = fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
      return res;
    }).catch(() => null);

    if (cached) {
      if (sameOrigin) e.waitUntil(refresh); // keep own files fresh for the next visit
      return cached;
    }
    const res = await refresh;
    if (res) return res;
    // Offline and not cached: a page navigation falls back to the app shell.
    if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
    return Response.error();
  })());
});
