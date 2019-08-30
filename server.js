const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
//put into public folder so that js and css all serve;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
app.get("/", function (req, res) {
  res.render(path.join(__dirname, "/views/index.handlebars"));
});
app.get("/about", function (req, res) {
  res.render(path.join(__dirname, "/views/about.handlebars"));
});
app.get("/contact", function (req, res) {
  res.render(path.join(__dirname, "/views/constact.handlebars"));
});

app.post("/api/restaurant/location", function (req, res) {
  console.log(req.body.restaurantsArr);
  res.send("I DID IT");
  // res.render(path.join(__dirname, "/views/index.handlebars"));
  //ajax call using req.params
  //app.post to server from front end
  //push to array 
  // render using handle bars
});

//listening on ***
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });