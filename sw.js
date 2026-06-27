const CACHE = 'artifact-manager-v1';
const ASSETS = ['/', '/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() =>
      caches.match('/index.html')
    ))
  );
});

// Handle share target
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.pathname === '/share' && e.request.method === 'POST') {
    e.respondWith((async () => {
      const data = await e.request.formData();
      const text = data.get('text') || data.get('url') || '';
      const title = data.get('title') || '';
      const client = await self.clients.get(e.resultingClientId || e.clientId);
      if (client) client.postMessage({ type: 'SHARE', text, title });
      return Response.redirect('/?shared=1', 303);
    })());
  }
});
