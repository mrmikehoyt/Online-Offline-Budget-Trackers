let db;

//opens database budget default version is 1
const request = indexedDB.open("budget", 1);
//check if updgrade is needed when opening indexdb

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};
//if succesfull opening indexdb
request.onsuccess = function(event) {
  // Save the IDBDatabase interface 
  db = event.target.result;

// check if app is online before reading from db
if (navigator.onLine) {
  checkDatabase();
}
};
//if there is an error opening indexdb
request.onerror = function(event) {
  console.log("Woops! " + event.target.errorCode);
  };
  
  function saveRecord(record) {
    // open a read/write db transaction, ready for adding the data
    const transaction = db.transaction(["pending"], "readwrite");
    //setting store variable to objectstore pending
    const store = transaction.objectStore("pending");
    //adds idbobject of all objects and adds objects to pending store
    
    store.add(record);
    }
    
    