"use strict";

module.exports = function(app) {
	app.get("/", (req, res) => {
		res.render("home");
	});

	app.post("/chat", (req, res) => {
		const username = req.body.username;

		if(username.length < 3 || username.length > 20)
			return res.render("home", {
				error: "Invalid username."
			});

		res.render("chat", {
			user: username
		});
	});
};
