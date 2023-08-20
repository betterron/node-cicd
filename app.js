var express = require("express");
var app = express();
var mysql = require("mysql");
dataFromDb = "dataFromDb update: ";
var con = mysql.createConnection({
  host: "tan-data-base-1.co2qppnbbqvy.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM new_schema.tan_test", function (err, result) {
    if (err) throw err;
    dataFromDb += JSON.stringify(result);
    console.log("Result: " + JSON.stringify(result));
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

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
