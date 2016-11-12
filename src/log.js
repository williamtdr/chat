const colors = require("colors"),
	  utils = require("./utils"),
	  sourceColors = {};

function colorize(source) {
	if(sourceColors[source])
		return colors[sourceColors[source]](source);

	return false;
}

function format(source, message, color) {
	const d = new Date();

	console.log((utils.zeroPad(d.getHours(), 2) + ":" + utils.zeroPad(d.getMinutes(), 2) + ":" + utils.zeroPad(d.getSeconds(), 2) + " ").magenta + "[".grey + (colorize(source) || source.white) + "]".grey + " "[color || "white"] + message);
}

module.exports = {
	setSourceColor(source, color) {
		if(String.prototype[color])
			sourceColors[source] = color;
	},
	info(source, message) {
		format(source, message);
	},
	debug(source, message) {
		format(source, message, "grey");
	},
	warn(source, message) {
		format(source, message, "yellow");
	},
	error(source, message) {
		format(source, message, "red");
	}
};