const CACHE_NAME = "static-cache-v12";

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/index.js',
  'manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
  'chart.js',
  'styles.css'
];


const DATA_CACHE_NAME = "data-cache-v1";
// install serviceworker
self.addEventListener("install", function(evt) {
  console.log('service worker installed')
  evt.waitUntil(
  caches.open(CACHE_NAME).then(cache => {
    console.log('caching files')
cache.addAll(FILES_TO_CACHE)
  }))
    })
  
//activate service worker
self.addEventListener('activate', evt =>{
  console.log ('service worker activated')
//waits for current service worker to finish activating
  evt.waitUntil(
  //displays keys static caches needed for changes
caches.keys().then(keys => {
//console.log(keys); 
//promise all needed for array of old static cache names because there could be many cache names
return Promise.all(keys
  .filter(key => key !== CACHE_NAME)
  .map(key => caches.delete(key))
  //above cleans old caches that are not called cache_name variable string
)  
})
  );
})

//
//created fetch event when getting stuff from server
self.addEventListener('fetch', evt =>{
  //console.log('fetch event',evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request);
    })
  );
})

//self.skipWaiting();


