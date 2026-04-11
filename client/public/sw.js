const CACHE_VERSION = 'v3';
const ASSET_CACHE = `pixocraft-assets-${CACHE_VERSION}`;
const STATIC_CACHE = `pixocraft-static-${CACHE_VERSION}`;
const SHELL_CACHE = `pixocraft-shell-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/favicon.png',
  '/logo.png',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const validCaches = [ASSET_CACHE, STATIC_CACHE, SHELL_CACHE];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !validCaches.includes(name))
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;

  // Hashed JS/CSS assets — cache-first forever (content-hashed filenames = safe)
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      })
    );
    return;
  }

  // HTML navigation — serve shell from cache while revalidating in background
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.open(SHELL_CACHE).then(async (cache) => {
        const cached = await cache.match('/');

        // Always revalidate in background so next visit gets fresh HTML
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            // Store the fresh shell under '/' key so all nav routes share it
            cache.put('/', response.clone());
          }
          return response;
        }).catch(() => cached);

        // Return cached shell immediately if available (stale-while-revalidate)
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Static files (images, fonts, manifest) — stale-while-revalidate
  event.respondWith(
    caches.open(STATIC_CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      const fetchPromise = fetch(request).then((response) => {
        if (response.ok) cache.put(request, response.clone());
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
