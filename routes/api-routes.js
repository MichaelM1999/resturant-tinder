const axios = require("axios");
require("dotenv").config();
const db = require("../models");
const path = require("path");

module.exports = app => {
    app.put("/api/countUpdate", (req,res) => {
        console.log("REQUEST BODY" + JSON.stringify(req.body));
        let updateData = {};
        updateData[req.body.name] = req.body.count;
        console.log((updateData));
        db.Restaurant.update(updateData, {
            where: {
                business_id: req.body.id
            }
        }).then(response => {
            res.json(response);
        });
    });
};


