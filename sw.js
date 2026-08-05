// Harbour service worker — precache the app shell, serve cache-first.
const VERSION = 'harbour-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './fonts/spacegrotesk-var.woff2',
  './fonts/instrumentsans-var.woff2',
  './js/app.js',
  './js/store.js',
  './js/seed.js',
  './js/ui.js',
  './js/icons.js',
  './js/views/home.js',
  './js/views/dashboard.js',
  './js/views/calendar.js',
  './js/views/bookings.js',
  './js/views/swimmers.js',
  './js/views/blocks.js',
  './js/views/settings.js',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit =>
      hit || fetch(e.request).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
