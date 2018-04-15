'use strict';

import '../style.css';
import { moves } from './moves';
import { players } from './players';
import { getElement, getElements, click, enableButton} from './dom';
import socket from './socket';

function bindMoves(player) {  
  getElements(`${player.tag} button`).forEach((button, i, bArr) => {    
    click(button, function(event) {
      bArr.forEach(enableButton);
      player.move = moves[this.dataset.move];
      socket.sendMessage(players);
      this.disabled = true;
      getElement(player.imgTag).src = `images/${player.pictures[player.move.name]}`;
      if (players.every(p => p.move)) {
        getWinner();
      }
    });
  });
}

players.forEach(p => bindMoves(p));

function getWinner() {
  const [player1, player2] = players;  
  getElement('#game-board').hidden = false;
  if (player1.move.name === player2.move.win) {
    console.log('player2 wins.');
  } else if (player1.move.name === player2.move.lose) {
    console.log('player1 wins.');
  } else {
    console.log('a draw. boring.');
  }
}

click(getElement('#reset-button'), resetGame);

export function resetGame() {
  players.forEach(p => delete p.move);
  getElement('#game-board').hidden = true;
  getElements(`button`).forEach(enableButton);    
  socket.sendMessage(players);
}