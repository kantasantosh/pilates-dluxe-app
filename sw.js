const CACHE='pilates-v143r';
const ASSETS=['./','./index.html','./icon192.png','./icon512.png','./manifest.json'];
self.addEventListener('install', e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));
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
    fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
  );
});
