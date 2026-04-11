const CACHE_VERSION = 'v5';
const ASSET_CACHE = `pixocraft-assets-${CACHE_VERSION}`;

// ── Install: nothing to precache, activate immediately ────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

// ── Activate: delete old caches from previous versions ────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) =>
        Promise.all(
          names
            .filter((n) => n !== ASSET_CACHE)
            .map((n) => caches.delete(n))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: only intercept hashed asset chunks — everything else hits network ──
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only GET requests, only same-origin, only the hashed /assets/ path
  if (
    request.method !== 'GET' ||
    !request.url.startsWith(self.location.origin) ||
    !new URL(request.url).pathname.startsWith('/assets/')
  ) {
    // Let the browser handle it normally — no SW interference
    return;
  }

  // Cache-first for hashed assets (content-hashed filenames = safe forever)
  event.respondWith(
    caches.open(ASSET_CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
  );
});

// ── Message: allow pages to trigger a skipWaiting ─────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
