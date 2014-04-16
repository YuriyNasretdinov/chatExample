window.socket = new WebSocket("ws://" + location.host + "/ws");

function sendMessage(msg)
{
	var len = '' + msg.length
	while (len.length < 5) len += ' '
	socket.send(len + msg)
}

function handleSubmit()
{
	var el = document.getElementById("chat-msg")
	sendMessage(el.value)
	el.value = ''

	return false;
}

function setUpSocket(onmessage)
{
	socket.onopen = function() { 
	  console.log("Connected");
	}

	socket.onclose = function(event) { 
	  if (event.wasClean) {
	    console.log('Connection closed');
	  } else {
	    console.log('ERROR: Connection reset');
	    console.log('Code: ' + event.code + ' reason: ' + event.reason);
	  }
	}

	socket.onmessage = onmessage;

	socket.onerror = function(error) { 
	  console.log("Ошибка " + error.message); 
	}
}

function displayMessage(msg)
{
	var container = document.getElementById("container")

	var div = document.createElement("div")
	div.className = 'message'

	var textNode = document.createTextNode(msg.data);

	div.appendChild(textNode)
	container.appendChild(div)
}
