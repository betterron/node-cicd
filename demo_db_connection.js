var mysql = require("mysql");

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
    console.log("Result: " + JSON.stringify(result));
  });
});
