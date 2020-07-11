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

//for connecting to heroku
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://heroku_v7f1df4k:kp49qoqjj0b1lq7alimv72s58e@ds119210.mlab.com:19210/heroku_v7f1df4k';

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

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.listen(process.env.PORT || 3000);{
  console.log(`App running on port ${PORT}!`);
};