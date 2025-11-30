const CACHE_NAME = "matematica-app-v4";
const FILES_TO_CACHE = [
  "/",
  "/favicon.ico?v=4",
  "/favicon-16x16.png?v=4",
  "/favicon-32x32.png?v=4",
  "/apple-touch-icon.png?v=4",
  "/manifest.json?v=4",
  "/android-chrome-192x192.png?v=4",
  "/android-chrome-512x512.png?v=4",
];

// Instalare service worker și cache
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activare și ștergere cache vechi
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Network-first, fallback la cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Poți optional pune în cache și răspunsul
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
