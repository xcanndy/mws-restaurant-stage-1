if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


const appCaches = [
  {
    name: 'core-001',
    urls: [
      '/',
      '/index.html',
      '/restaurant.html',
    ]
  },
  {
    name: 'styles-001',
    urls: [
      '/css/styles.css',
    ]
  },
  {
    name: 'scripts-001',
    urls: [
      '/js/main.js',
      '/js/dbhelper.js',
      '/js/restaurant_info.js',
      '/sw.js'
    ]
  },
  {
    name: 'data-001',
    urls: [
      '/data/restaurants.json'
    ]
  }
];

self.addEventListener('install', function(event) {
  event.waitUntil(Promise.all(
    appCaches.map( (appCaches) => {
      return caches.open(appCaches.name)
        .then( (cache) => {
          return cache.addAll(appCaches.urls);
        })
    })
  ));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(appCaches.name).then( cache => {
      return cache.match(event.request)
      .then(response => {
        if(response) {
          return response;
        }

        return fetch(event.request)
        .then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }); 
      }).catch(err => {
        console.log('Error in fetch handler', err);
        throw err;
      })
    })
  )
});
