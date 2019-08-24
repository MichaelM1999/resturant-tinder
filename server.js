var express = require("express");
var path = require("path");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

var app = express();
var PORT = 3000;

app.use(express.static("public"));
//put into public folder so that js and css all serve;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
//routes
app.get("/", function (req, res) {
  res.render(path.join(__dirname, "/views/index.handlebars"));
});
// CODE HERE


app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });