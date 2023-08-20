require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

var express = require("express");
var app = express();
var mysql = require("mysql");
dataFromDb = "dataFromDb update: " + `${process.env.NODE_ENV}`;
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM new_schema.tan_test", function (err, result) {
    if (err) throw err;
    dataFromDb += JSON.stringify(result);
    console.log(`Result: ${process.env.NODE_ENV} : ` + JSON.stringify(result));
  });
});

// This responds with "Hello World" on the homepage
app.get("/", function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send(dataFromDb);
});

// This responds a POST request for the homepage
app.post("/", function (req, res) {
  console.log("Got a POST request for the homepage");
  res.send("Hello POST");
});

// This responds a DELETE request for the /del_user page.
app.delete("/del_user", function (req, res) {
  console.log("Got a DELETE request for /del_user");
  res.send("Hello DELETE");
});

// This responds a GET request for the /list_user page.
app.get("/list_user", function (req, res) {
  console.log("Got a GET request for /list_user");
  res.send("Page Listing");
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get("/ab*cd", function (req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send("Page Pattern Match");
});
console.log(process.env);
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
