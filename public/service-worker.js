const FILES_TO_CACHE = [
  '/index.html',
  '/index.js',
  'manifest.webmanifest',
  '/icons/icon-192x192.png',
  'icon-512x512.png'
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// install serviceworker
self.addEventListener("install", function(evt) {
  console.log('service worker installed')
 
    })
  
//activate service worker
self.addEventListener('activate', evt =>{
  console.log ('service worker activated')
})
self.skipWaiting();


