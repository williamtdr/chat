module.exports = function(wss) {
	wss.on("connection", (connection) => {
		console.log("[Websocket] Client connected.");

		connection.on("message", (message) => {

		});

		connection.on("close", () => {
			console.log("[Websocket] Client disconnected.");
		});
	});
};