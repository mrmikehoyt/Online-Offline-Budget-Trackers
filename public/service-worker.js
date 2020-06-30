const CACHE_NAME = "static-cache-v6";

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/index.js',
  'manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0'
];
//cache name needed to be changed anytime change to cached files is made so service worker is re-run
//const DATA_CACHE_NAME = "data-cache-v1"; -commented out 9:46 do not believe needed at this time

// install serviceworker
self.addEventListener("install", function(evt) {
 // console.log('service worker installed')
  evt.waitUntil(
  caches.open(CACHE_NAME).then(cache => {
//    console.log('caching files')
cache.addAll(FILES_TO_CACHE)
  }))
    })
  
//activate service worker
self.addEventListener('activate', evt =>{
  //console.log ('service worker activated')
//waits for current service worker to finish activating
  evt.waitUntil(
  //displays keys static caches needed for changes
caches.keys().then(keys => {
console.log(keys); 
})
  );
})

//created fetch event when getting stuff from server
self.addEventListener('fetch', evt =>{
 // console.log('fetch event',evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request);
    })
  );
})

//self.skipWaiting();


