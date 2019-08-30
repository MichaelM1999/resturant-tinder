// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/Emojis", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Emoji.findAll({}).then(function(dbEmoji) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbEmoji);
    });
  });

  // POST route for saving a new emoji
  app.post("/api/emoji", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Emoji.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbEmoji) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbEmoji);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo we want to delete from
  // req.params.id
  app.delete("/api/emoji/:id", function(req, res) {

  });

  // PUT route for updating todos. We can get the updated todo from req.body
  app.put("/api/emojis", function(req, res) {

  });
};
