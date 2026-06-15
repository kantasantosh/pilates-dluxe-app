const CACHE='pilates-v5';
const ASSETS=['./', './index.html', './booking.html', './icon-192.png', './icon-512.png', './manifest.json'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  // Network first — always get fresh data
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
