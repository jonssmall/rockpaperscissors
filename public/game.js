const rock = {
  name: 'rock',
  win: 'scissors',
  lose: 'paper'
};

const paper = {
  name: 'paper',
  win: 'rock',
  lose: 'scissors'
};

const scissors = {
  name: 'scissors',
  win: 'paper',
  lose: 'rock'
};

const moves = {
  rock,
  paper,
  scissors
};

const player1 = {
  tag: '#player-1',
  pictures: {
    rock: 'rockRight.jpeg',
    paper: 'paperRight.jpeg',
    scissors: 'scissorsRight.jpeg'
  }
};

const player2 = {
  tag: '#player-2',
  pictures: {
    rock: 'rockLeft.jpeg',
    paper: 'paperLeft.jpeg',
    scissors: 'scissorsLeft.jpeg'
  }
};

const players = [player1, player2];

function bindMoves(player) {  
  document.querySelectorAll(`${player.tag} button`).forEach((button, i, bArr) => {    
    button.addEventListener('click', function(event) {
      bArr.forEach(b => b.disabled = false);
      player.move = moves[this.dataset.move];
      this.disabled = true;
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
    alert('player2 wins.');
  } else if (player1.move.name === player2.move.lose) {
    alert('player1 wins.');
  } else {
    alert('a draw. boring.');
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