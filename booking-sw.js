const CACHE='booking-v31';
const ASSETS=['./booking.html'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('message', e=>{
  if(e.data==='skipWaiting')self.skipWaiting();
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});
