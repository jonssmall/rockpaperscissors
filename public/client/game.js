'use strict';

import '../style.css';
import { moves } from './moves';
import { players } from './players';

function bindMoves(player) {  
  document.querySelectorAll(`${player.tag} button`).forEach((button, i, bArr) => {    
    button.addEventListener('click', function(event) {
      bArr.forEach(b => b.disabled = false);
      player.move = moves[this.dataset.move];
      this.disabled = true;
      document.querySelector(player.imgTag).src = `images/${player.pictures[player.move.name]}`;
      if (players.every(p => p.move)) {
        getWinner();
      }
    });
  });
}

players.forEach(p => bindMoves(p));

function getWinner() {  
  document.querySelector('#game-board').hidden = false;
  if (player1.move.name === player2.move.win) {
    console.log('player2 wins.');
  } else if (player1.move.name === player2.move.lose) {
    console.log('player1 wins.');
  } else {
    console.log('a draw. boring.');
  }
}

const host = location.origin.replace(/^http/, 'ws');
const clientSocket = new WebSocket(host);
//Keeps sockets alive on Heroku.
clientSocket.onopen = event => {  
  setInterval(() => {
    clientSocket.send('ping');
  }, 24000);
};
clientSocket.onmessage = event => {      
  if (event.data !== '"ping"') console.log(event.data);
};

function sendMessage(message) {
  clientSocket.send(message);
}

document.querySelector('#reset-button').addEventListener('click', function(button) {
  resetGame();
});

function resetGame() {
  delete player1.move;
  delete player2.move;
  document.querySelector('#game-board').hidden = true;
  document.querySelectorAll(`button`).forEach(button => button.disabled = false);    
}