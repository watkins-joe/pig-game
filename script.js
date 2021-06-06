'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //little faster than querySelector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
//js will convert these numbers to strings
//for html

diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let inactivePlayer = 1;
let playing = true;

const init = function () {
  //set all scores to zero
  currentScore = 0;
  scores = [0, 0];

  //set active player to player 0
  activePlayer = 0;

  //set game state of 'playing' from false to true
  playing = true;

  //current score
  current0El.textContent = 0;
  current1El.textContent = 0;

  //total score
  score0El.textContent = 0;
  score1El.textContent = 0;

  //randomizes who goes first in next game
  //   activePlayer = Math.round(Math.random());

  //hide dice
  diceEl.classList.add('hidden');

  //remove winner class from player
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //remove active classes
  player1El.classList.remove('player--active');

  //add active class to player 1, who always goes first
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // toggle adds class if it is not there, but if it is there,
  // it will remove it.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Resetting the game functionality
btnNew.addEventListener('click', init);

// Rolling the dice functionality
btnRoll.addEventListener('click', function () {
  // if game state is playing === true, this code will work
  if (playing) {
    // 1. Generate a random dice roll between 1 and 6
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceEl.classList.remove('hidden');

    // manipulate src attribute of img element in HTML
    // will dynamically load the dice img based on the
    // number rolled

    // diceEl targets the img element with class 'dice'
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check if dice rolled a 1; if true.
    if (diceRoll !== 1) {
      // add dice to current score
      currentScore += diceRoll; // currentScore = currentScore + diceRoll

      // select element dynamically based on who the active player is
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // if game state is playing === true, this code will work
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; // score = score + currentScore
    // scores[1] = scores[1] + currentScore

    // 2. add currentScore to total score dynamically
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 3. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      // hide displayed dice
      diceEl.classList.add('hidden');
      // change bg color of winning player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove active player bg color
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // If not, switch to next player.
      switchPlayer();
    }
  }
});
