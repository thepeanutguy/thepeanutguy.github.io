'use strict';

const FALLBACK_NAME = 'Doughnut';
const OPTIONS = Array.from({ length: 100 }, (_, i) => ('Bread rolls').toString());
const STAR_OPTION = 'Bread rolls';

/**
 * @param {number} min
 * @param {number} max
 * @param {number} count
 * @return {number[]}
 */
const randomNumbers = (min, max, count) => {
  const numbers = [];

  for (let i = 0; i < count; i += 1) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    numbers.push(randomNumber);
  }

  return numbers;
}

window.onload = () => {
  const introEl = document.querySelector('#intro');
  const introFormEl = document.querySelector('#intro-form');
  const bingoCardEl = document.querySelector('#bingo-card');
  const bingoCardTitleEl = document.querySelector('#bingo-card-title');
  const bingoCardGridEl = document.querySelector('#bingo-card-grid');
  const bingoCardRestartEl = document.querySelector('#bingo-card-restart');

  // /**
  //  * @return {NodeListOf<Element>}
  //  */
  const getBingoGridSquares = () => {
    return document.querySelectorAll('.bingo-card__grid__square');
  };

  /**
   * @return {void}
   */
  const addEventListenerToSquares = () => {
    // const squares = getBingoGridSquares();
    //
    // for (const square of squares) {
    //   square.addEventListener('click', (event) => {
    //     console.log(event)
    //   });
    // }
  };

  /**
   * @param {number} option
   * @param {number} index
   * @return {void}
   */
  const addBingoSquare = (option, index) => {
    const squareEl = document.createElement('button');
    const rows = [0, 5, 10, 15, 20];

    if (rows.includes(index)) {
      const rowEl = document.createElement('div');

      rowEl.classList.add('bingo-card__grid__row');

      bingoCardGridEl.appendChild(rowEl);
    }

    squareEl.type = 'button';
    squareEl.classList.add('button', 'button__primary', 'bingo-card__grid__square');

    if (index === 12) {
      squareEl.textContent = STAR_OPTION;
      squareEl.classList.add('bingo-card__grid__square--star');
    } else {
      squareEl.textContent = OPTIONS[option];
    }

    bingoCardGridEl.lastChild.appendChild(squareEl);
  };

  /**
   * @return {void}
   */
  const setBingoSquares = () => {
    randomNumbers(0, 99, 25).map(addBingoSquare);
  };

  const removeBingoSquares = () => {
    bingoCardGridEl.innerHTML = '';
  };

  const intro = {
    show: () => {
      introEl.classList.remove('intro--hidden');
    },
    hide: () => {
      introEl.classList.add('intro--hidden');
    },
  };

  const bingoCard = {
    show: (username) => {
      bingoCardTitleEl.textContent = `${username}'s bingo card`;

      setBingoSquares();
      addEventListenerToSquares();

      bingoCardEl.classList.remove('bingo-card--hidden');
    },
    hide: () => {
      bingoCardEl.classList.add('bingo-card--hidden');
    },
  };

  introFormEl.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = event.target?.[0].value || FALLBACK_NAME;

    intro.hide();
    bingoCard.show(username);
  });

  // bingoCardRestartEl.addEventListener('click', () => {
  //   bingoCard.hide();
  //   removeBingoSquares();
  //   intro.show();
  // });
};
