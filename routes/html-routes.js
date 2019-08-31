const path = require("path");

module.exports = (app) => {
    app.get("/", function(req, res) {
        res.render(path.join(__dirname, "../views/index"));
    });

    app.get("/app", function(req, res) {
        res.render(path.join(__dirname, "../views/app"));
    });
}
