var db = require("../models");

module.exports = function(app) {

    app.post("/api/emoji", function(req, res){
        db.Post.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        })
    })
}
