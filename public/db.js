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
    
    function checkDatabase() {
    // open a read/write db transaction, ready for adding the data
    const transaction = db.transaction(["pending"], "readwrite");
    //setting store variable to objectstore pending
    const store = transaction.objectStore("pending");
    //returns idbobject of all objects of pending store
    const getAll = store.getAll();
    //when back online use post route /api/transaction/bulk to send to mongoose / mongodb database
    getAll.onsuccess = function() {
      if (getAll.result.length > 0) {
        fetch("/api/transaction/bulk", {
          method: "POST",
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
          .then(() => {
            // delete records if successful
            const transaction = db.transaction(["pending"], "readwrite");
            const store = transaction.objectStore("pending");
            //deletes idbobject and deletes all objects of pending store
            store.clear();
          });
      }
    };
    }
    
    