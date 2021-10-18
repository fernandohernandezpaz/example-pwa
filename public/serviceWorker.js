let cacheData = 'appV1';
let urlsToCache = [
    'static/js/bundle.js',
    'static/js/vendors~main.chunk.js',
    'static/js/main.chunk.js',
    'index.html',
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        cacheData.open(cacheData).then(cache => {
            cache.addAll(urlsToCache);
        })
    )
})

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            console.log(response);
            return fetch(event.request)
                .catch(() => caches.match('index.html'))
        })
    )
});

// Activate the SW
this.addEventListener('activate', (event) => {
    const cacheWhitelist = ['cacheData'];
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});