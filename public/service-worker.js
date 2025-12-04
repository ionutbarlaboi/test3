const CACHE_NAME = "matematica-app-v5";

const FILES_TO_CACHE = [
  "/",
  "/favicon.ico?v=5",
  "/favicon-16x16.png?v=5",
  "/favicon-32x32.png?v=5",
  "/apple-touch-icon.png?v=5",
  "/manifest.json?v=5",
  "/android-chrome-192x192.png?v=5",
  "/android-chrome-512x512.png?v=5",
];

// Instalare service worker și cache
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
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
      .then((response) => response)
      .catch(() => caches.match(event.request))
  );
});

// Aici, la sfârșitul fișierului tău sw.js

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notificare nouă";
  const options = {
    body: data.body || "Ai un mesaj nou",
    icon: "/android-chrome-192x192.png?v=5",
    badge: "/android-chrome-192x192.png?v=5",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
