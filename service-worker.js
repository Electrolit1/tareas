const CACHE_NAME = 'tareas-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './firebase-config.js',
  './manifest.json',
  // agrega aquí todos los archivos que usas en tu proyecto,
  // además de los iconos
  './icons/icon-192.png',
  './icons/icon-512.png',
  // y también las URLs externas de Firebase (opcional, pero funcionan online)
];

// Instalación y cacheado
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación y limpieza de cache viejo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Interceptar peticiones para servir cache o hacer fetch online
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(resp => resp || fetch(event.request))
  );
});
