if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(registration => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-mws').then(cache => {
      return cache.addAll(
        [
          '/img',
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/main.js'
        ]
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('cache-mws').then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
            return response;
        });
      });
    })
  );
});

