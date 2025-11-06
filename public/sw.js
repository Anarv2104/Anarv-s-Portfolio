// Service Worker for aggressive image caching
const CACHE_NAME = 'portfolio-images-v1';
const IMAGE_CACHE_NAME = 'portfolio-images-cache-v1';

// Images to cache immediately (modern formats first)
const CRITICAL_IMAGES = [
  '/images/avatar.avif',
  '/images/avatar.webp',
  '/images/avatar.jpg',
  '/images/teammates/prayers.avif',
  '/images/teammates/prayers.webp',
  '/images/teammates/prayers.jpg',
  '/images/teammates/priyank.avif',
  '/images/teammates/priyank.webp',
  '/images/teammates/priyank.jpg',
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
          '/',
          '/about',
          '/work',
          '/blog',
        ]);
      }),
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.addAll(CRITICAL_IMAGES);
      })
    ])
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle images
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(request).then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return a fallback image if needed
            return new Response('<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em">Image unavailable</text></svg>', {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          });
        });
      })
    );
    return;
  }

  // Handle other requests
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});