// Service Worker för Sjöstedt Måleri AB
// Cachar videon så den laddas snabbt vid återbesök

const CACHE_NAME = 'sjostedt-maleri-v1';
const VIDEO_CACHE = 'sjostedt-video-v1';

// Filer att cacha direkt
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

// Installera Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache öppnad');
        return cache.addAll(urlsToCache);
      })
  );
  // Aktivera direkt utan att vänta
  self.skipWaiting();
});

// Aktivera och rensa gamla cachar
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== VIDEO_CACHE) {
            console.log('Tar bort gammal cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Ta kontroll över alla klienter direkt
  self.clients.claim();
});

// Hantera fetch-förfrågningar
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Speciell hantering för videofiler
  if (event.request.url.includes('.mp4') || event.request.url.includes('video')) {
    event.respondWith(
      caches.open(VIDEO_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('Video laddad från cache');
            return cachedResponse;
          }
          
          // Ladda ner och cacha videon
          return fetch(event.request).then((networkResponse) => {
            // Klona responsen innan vi cachar den
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
              console.log('Video cachad');
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }
  
  // För andra filer, försök cache först, sedan nätverk
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

