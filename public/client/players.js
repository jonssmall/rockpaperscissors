'use strict';

const player1 = {
  tag: '#player-1',
  imgTag: '#img-1',
  pictures: {
    rock: 'rockRight.jpg',
    paper: 'paperRight.jpg',
    scissors: 'scissorsRight.jpg'
  }
};

const player2 = {
  tag: '#player-2',
  imgTag: '#img-2',
  pictures: {
    rock: 'rockLeft.jpg',
    paper: 'paperLeft.jpg',
    scissors: 'scissorsLeft.jpg'
  }
};

export const players = [player1, player2];