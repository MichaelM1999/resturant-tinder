const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const db = require("./models");
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
app.get("/api/:location", function (req, res) {
  // res.render(path.join(__dirname, "/views/index.handlebars"));
  //ajax call using req.params
  //app.post to server from front end
  //push to array 
  // render using handle bars
});

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});