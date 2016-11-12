"use strict";

const express = require("express"),
	  exphbs = require("express-handlebars"),
	  compression = require("compression"),
	  bodyParser = require("body-parser"),
	  fs = require("fs"),
	  ws = require("ws"),
	  server = require("http").createServer(),
	  WebSocketServer = require("ws").Server,
	  wss = new WebSocketServer({
		  server: server
	  }),
	  websocket = require("./websocket")(wss),
	  log = require("../log"),
	  colors = require("colors"),
	  utils = require("../utils");

let app = express();

app.engine("handlebars", exphbs({
	defaultLayout: "main",
	helpers: {

	}
}));

app.set("view engine", "handlebars");

app.use(compression());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static("static"));
app.use((req, res, next) => {
	if(req.path.indexOf("js") === -1 && req.path.indexOf("css") === -1 && req.path.indexOf("favicon") === -1)
		log.info("HTTP", req.ip.grey + " " + req.method.green + " " + req.path.white);

	next();
});

require("../app/routes")(app);

let ip = global.userConfig.get("web_server.ip"),
	port = global.userConfig.get("web_server.port");

server.listen(port, ip, () => {
	log.info("HTTP", "Web server listening on " + ip + ":" + port);
});

server.on("request", app);
