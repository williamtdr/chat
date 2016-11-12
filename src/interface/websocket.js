"use strict";

const clients = {};

function broadcast(event, message) {
	const text = JSON.stringify({
		event: event,
		data: message
	});

	for(let cid in clients) {
		let client = clients[cid];

		if(client.connection.readyState === 1)
			client.connection.send(text);
	}
}

module.exports = function(wss) {
	wss.on("connection", (connection) => {
		console.log("[Websocket] Client connected.");

		connection.on("message", (message) => {
			try {
				message = JSON.parse(message);

				switch(message.event) {
					case "hello":
						console.log("[Chat] " + message.data + " joined the server.");
						clients[connection.upgradeReq.headers["sec-websocket-key"]] = {
							name: message.data,
							connection: connection
						};

						broadcast("join", message.data);
					break;
					case "message":
						broadcast("message", [clients[connection.upgradeReq.headers["sec-websocket-key"]].name, message.data]);
				}
			} catch(e) {}
		});

		connection.on("close", () => {
			try {
				console.log("[Chat] " + clients[connection.upgradeReq.headers["sec-websocket-key"]].name + " left the server.");

				delete clients[connection.upgradeReq.headers["sec-websocket-key"]];

				broadcast("leave", message.data);
			} catch(e) {}
		});
	});
};
