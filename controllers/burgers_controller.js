var express = require("express");

var router = express.Router();
var burger = require("../models/burger");

router.get("/", function (req, res) {
  burger.selectAll(function (burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

router.post("/api/burgers", function (req, res) {
  burger.insertOne(
    ["burger_name"],
    [req.body.burger_name],
    function (result) {
      // Send back the ID of the new quote
      res.redirect("/");
    }
  );
});

router.put("/api/burgers/:id", function (req, res) {
  burger.updateOne({ devoured: true }, req.params.id, function (result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;