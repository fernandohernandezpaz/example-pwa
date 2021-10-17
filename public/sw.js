let cacheData = 'appV1';

this.addEventListener('install', (event) => {
    event.waitUntil(
        cacheData.open(cacheData).then(cache => {
            cache.addAll([
                'static/js/bundle.js',
                'static/js/vendors~main.chunk.js',
                'static/js/main.chunk.js',
                '/index.html',
            ]);
        })
    )
})

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(resp => {
            if (resp) {
                return resp
            }
        })
    )
});