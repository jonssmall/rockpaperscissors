'use strict';

const host = location.origin.replace(/^http/, 'ws');
const clientSocket = new WebSocket(host);
//Keeps sockets alive on Heroku.
clientSocket.onopen = event => {  
  setInterval(() => {
    clientSocket.send('ping');
  }, 24000);
};
clientSocket.onmessage = event => {      
  if (event.data !== '"ping"') console.log(JSON.parse(event.data));
};

function sendMessage(message) {
  clientSocket.send(JSON.stringify(message));
}

export default {  
  sendMessage
}