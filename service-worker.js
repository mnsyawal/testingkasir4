const CACHE_NAME = 'pos-kasir-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['./index.html', './manifest.json']))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.map(n => { if(n !== CACHE_NAME) return caches.delete(n); })))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(res => res || fetch(e.request).catch(() => { if (e.request.mode === 'navigate') return caches.match('./index.html'); }))); });