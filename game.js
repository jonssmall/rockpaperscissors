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
  tag: '#player-1'
};

const player2 = {
  tag: '#player-2'
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

players.forEach(p => bindMoves);

function getWinner() {  
  if (player1.move.name === player2.move.win) {
    alert('player2 wins.');
  } else if (player1.move.name === player2.move.lose) {
    alert('player1 wins.');
  } else {
    alert('a draw. boring.');
  }
}