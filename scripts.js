const cards = document.querySelectorAll('.memory-card');

const audio1 = new Audio("/audio/kreissäge-01.wav");
const audio2 = new Audio("/audio/Moewen02.wav");
const audio3 = new Audio("/audio/SchaufelAuf.wav");
const audio4 = new Audio("/audio/Boot01.wav");
const audio5 = new Audio("/audio/Hammer-03.wav");
const audio6 = new Audio("/audio/Klingel.wav");
//const audio7 = new Audio("/audio/Klingel.wav");
//const audio8 = new Audio("/audio/Klingel.wav");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



//const music = new Audio('/audio/kreissäge-01.wav');
//music.play();
//music.loop =true;



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  this.classList.contains('audio');
  // starts audio after flipping card
  switch(true){
    case this.classList.contains('audio1'):
      audio1.play();
      break;
    case this.classList.contains('audio2'):
      audio2.play();
      break;
    case this.classList.contains('audio3'):
      audio3.play();
      break;
    case this.classList.contains('audio4'):
      audio4.play();
      break;
    case this.classList.contains('audio5'):
      audio5.play();
      break;
    case this.classList.contains('audio6'):
      audio6.play();
      break;
/*    case this.classList.contains('audio7'):
      audio7.play();
      break;
    case this.classList.contains('audio8'):
      audio8.play();
      break;*/
  }

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function stopAudio() {
  audio1.pause();
  audio1.currentTime = 0;
  audio2.pause();
  audio2.currentTime = 0;
  audio3.pause();
  audio3.currentTime = 0;
  audio4.pause();
  audio4.currentTime = 0;
  audio5.pause();
  audio5.currentTime = 0;
  audio6.pause();
  audio6.currentTime = 0;
/*  audio7.pause();
  audio7.currentTime = 0;
  audio8.pause();
  audio8.currentTime = 0;*/
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    stopAudio()
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
    audio1.pause();audio1.currentTime = 0;
    audio2.pause();audio2.currentTime = 0;
    audio3.pause();audio3.currentTime = 0;
    audio4.pause();audio4.currentTime = 0;
    audio5.pause();audio5.currentTime = 0;
    audio6.pause();audio6.currentTime = 0;
    audio7.pause();audio7.currentTime = 0;
    audio8.pause();audio8.currentTime = 0;
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
