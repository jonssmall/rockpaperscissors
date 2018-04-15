'use strict';

import { getElement } from './dom';
import { resetGame } from './game';

const host = location.origin.replace(/^http/, 'ws');
const clientSocket = new WebSocket(host);
//Keeps sockets alive on Heroku.
clientSocket.onopen = event => {  
  setInterval(() => {
    clientSocket.send('ping');
  }, 24000);
};
clientSocket.onmessage = event => {      
  if (event.data !== "ping") {
    const players = JSON.parse(event.data);
    // neither player has moves means a reset button was called;
    if (!players.some(p => p.move)) {
      resetGame();
    } else {
      players.forEach(p => {
        if (p.move) {
          getElement(`${p.tag} [data-move='${p.move.name}']`).click();
        }
      });
    }

    // players.forEach(p => {
    //   if (p.move) {
    //     getElement(`${p.tag} [data-move='${p.move.name}']`).click();
    //   }
    // });
  }
};

function sendMessage(message) {
  clientSocket.send(JSON.stringify(message));
}

export default {  
  sendMessage
}