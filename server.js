const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const mongodb = require('mongodb');



const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// routes
app.use(require("./routes/api.js"));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
var MongoClient = mongodb.MongoClient;
//var url = 'mongodb://localhost/exercisetracker';      
var url = 'mongodb://heroku_hd8nxlfw:cm5m4manr1laf8ttl48m343vlf@ds031203.mlab.com:31203/heroku_hd8nxlfw';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

    console.log('Connection established');


    //Close connection
    db.close();
  }
});
var url = process.env.MONGOLAB_URI;

//above for connecting to heroku 
//needed for connecting to mongoose database and creating document exercisetracker
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workouttracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})






app.listen(process.env.PORT || 3000); {
  console.log(`App is running on port ${PORT}`)
}