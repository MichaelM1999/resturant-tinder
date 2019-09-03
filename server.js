// INIT SERVER
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// SYNC MODELS FOR DB
const db = require("./models");


// HANDLEBARS INIT
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// ROUTES INIT
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);




db.sequelize.sync({force: true}).then(() => {
// START SERVER
    app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
});