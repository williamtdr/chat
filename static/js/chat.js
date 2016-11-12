var ws = new WebSocket("ws://" + location.host),
	messageContainer = $("#chat-messages");

function makeSystemMessage(message) {
	messageContainer.append("<div class=\"message message-system\">" + message + "</div>");
}

function send(event, data) {
	ws.send(JSON.stringify({
		event: event,
		data: data
	}));
}

ws.onopen = function() {
	send("hello", username);
};

ws.onclose = function() {
	makeSystemMessage("Disconnected, please refresh.");
}

ws.onmessage = function(message) {
	message = JSON.parse(message.data);

	console.log(message);

	var event = message.event,
		data = message.data;

	switch(event) {
		case "join":
			makeSystemMessage(data + " joined the room");
		break;
		case "leave":
			makeSystemMessage(data + " left the room");
		break;
		case "message":
			messageContainer.append("<div class=\"message\"><span class=\"message-user\">" + data[0] + "</span><span class=\"message-content\">" + data[1] + "</span></div>");
		break;
		case "userlist":
			var userstring = "";

			for(var clientIndex in data)
				userstring += "<li>" + data[clientIndex] + "</li>";

			$("#user-list ul").html(userstring);
	}
};

$("#user-input").keypress(function(e) {
	if(e.which === 13) {
		send("message", $("#user-input").val());

		$("#user-input").val("");
	}
}).focus();
