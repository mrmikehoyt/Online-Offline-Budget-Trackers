var express = require("express");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("../routes/api"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true
});

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
