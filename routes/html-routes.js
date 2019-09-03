const path = require("path");

module.exports = (app) => {

    // LANDING PAGE
    app.get("/", function(req, res) {
        res.render(path.join(__dirname, "../views/index"));
    });

    // APP PAGE
    app.get("/app", function(req, res) {
        res.render(path.join(__dirname, "../views/app"));
    });
}
