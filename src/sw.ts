const CACHE_NAME = `baby-shift-${VERSION}`

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      let cache = await caches.open(CACHE_NAME)
      await cache.addAll(['/', '/index.js', '/index.css'])
    })()
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      let keyList = await caches.keys()
      return Promise.all(
        keyList.map(key => {
          if (key === CACHE_NAME) return Promise.resolve()
          return caches.delete(key)
        })
      )
    })()
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      let cachedResponse = await caches.match(event.request)
      if (cachedResponse) return cachedResponse
      return fetch(event.request)
    })()
  )
})
