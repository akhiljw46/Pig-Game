'use strict';
//Starting elements
// const score0El = document.querySelector('#score--0');
// const score1El = document.querySelector('#score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
const scoreEl = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
const currentEl = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//Initial Values
// score0El.textContent = 0;
// score1El.textContent = 0;
let isPlaying, currentScore, currentPlayer, scores;

const init = function () {
  currentPlayer = 0;
  isPlaying = true;
  currentScore = 0;
  scores = [0, 0];
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--winner');
  scoreEl[0].textContent = 0;
  scoreEl[1].textContent = 0;
  currentEl[0].textContent = 0;
  currentEl[1].textContent = 0;
};

const switchPlayer = function () {
  if (isPlaying) {
    currentScore = 0;

    currentEl[currentPlayer].textContent = currentScore;

    currentPlayer = currentPlayer === 1 ? 0 : 1;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
};

//User rolls dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1. Generate random dice roll
    const die = Math.trunc(Math.random() * 6 + 1);
    //2. Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${die}.png`;
    //3. Check if it is 1
    //4. if not 1 add dice roll to current score
    if (die !== 1) {
      currentScore += die;
      currentEl[currentPlayer].textContent = currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//User holds score
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[currentPlayer] += currentScore;
    scoreEl[currentPlayer].textContent = scores[currentPlayer];
    if (scores[currentPlayer] >= 20) {
      //current player wins
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.toggle('player--winner');
      diceEl.classList.add('hidden');
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
//Main execution
init();
