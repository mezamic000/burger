var express = require("express");

var burger = require("../models/burger");

var router = express.Router();

router.get("/", function (req, res) {
	burger.SelectAll(function (data) {
		var hdbrsObj = {
			burgers: data,
		};
		console.log(hdbrsObj);
		res.render("index", hdbrsObj);
	});
});

router.post("/api/burgers", function (req, res) {
	burger.insertOne(
		["burger_name", "devoured"],
		[req.body.burger_name, req.body.devoured],
		function (result) {
			// Send back the ID of the new quote
			res.json({ id: result.insertId });
		}
	);
});

router.put("/api/burgers/:id", function (req, res) {
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	burger.updateOne(
		{
			devoured: req.body.devoured,
		},
		condition,
		function (result) {
			if (result.changedRows == 0) {
				// If no rows were changed, then the ID must not exist, so 404
				return res.status(404).end();
			} else {
				res.status(200).end();
			}
		}
	);
});

router.deleteOne(condition, function (result) {
	var condition = "id = " + req.params.id;

	burger.deleteOne(condition, function (result) {
		if (result.affectedRows == 0) {
			// If no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;
