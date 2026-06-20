const CACHE='booking-v16';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  // network-first; fall back to cache only if offline
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
