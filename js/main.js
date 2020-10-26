const btnLower = document.querySelector(".btn-lower")
const btnSame = document.querySelector(".btn-same")
const btnHigher = document.querySelector(".btn-higher")
const gameOverModal = document.querySelector(".game-over")
const pointsFinal = document.querySelector(".points-final")
const message = document.querySelector(".message")
const winSound = new sound("../sounds/win.mp3");
const loseSound = new sound("../sounds/loselife.mp3")
const gameOverSound = new sound("../sounds/gameover.mp3")
const gameWinSound = new sound("../sounds/gamewin.mp3")

let deck = createCardDeck();
let pointsCount = 0;
let triesCount = 3;
let cardsLeft = 52;

function createCardDeck() {
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
  const suit = ["hearts", "diamonds", "clubs", "spades"]
  const cardDeck = [];
  for (let num of numbers) {
    for (let s of suit) {
      cardDeck.push([num, s])
    }
  } return cardDeck;
}



function pickRandomCard(deck) {
  let randomNumber = (Math.floor(Math.random() * deck.length));
  let randomCard = deck[randomNumber]
  deck.splice(randomNumber, 1)
  
  return randomCard
}



function showCard(card) {
  const cardNums = document.querySelectorAll("h6");
  cardNums.forEach(cardNum => cardNum.innerText = card[0])
  const images = document.querySelectorAll("img");
  images.forEach(image => {
    if (card[1] === "hearts") {
      image.src = "./images/hearts.png"
    } else if (card[1] === "spades") {
      image.src = "./images/spades.png"
    } else if (card[1] === "clubs") {
      image.src = "./images/clubs.png"
    }
    else if (card[1] === "diamonds") {
      image.src = "./images/diamonds.png"
    }
  })
}



function updatePoints() {
  const points = document.querySelector(".score");
  pointsCount++
  points.innerHTML = `<strong>${pointsCount}</strong>`
  
  if (pointsCount === 52) {
    gameOverModal.classList.add("visible");
    gameWinSound.play()
    message.innerText = "You Win!"
    pointsFinal.innerText = `Points: ${pointsCount}`
  }
}

function updateTries() {
  const tries = document.querySelector(".tries");
  triesCount--;
  
  tries.innerHTML = `<strong>${triesCount}</strong>`
  if (triesCount === 0) {
    gameOverSound.play()
    gameOverModal.classList.add("visible");
    pointsFinal.innerText = `Points: ${pointsCount}`
    
  }
}

function updateHowManyCards() {
  const howManyCards = document.querySelector(".how-many-cards");
  cardsLeft--;
  howManyCards.innerHTML = `<strong>${cardsLeft}</strong>`

}

function initializeGame(deck) {
  let randomCard = pickRandomCard(deck);
  let prevValue = randomCard[0];
  showCard(randomCard);
  console.log(randomCard);
  return prevValue;
}

let prevValue = initializeGame(deck)

function compareCards(prev, current) {
  if (prev === "J") {
    prev = 10;
  } else if (prev === "Q") {
    prev = 11;
  } else if (prev === "K") {
    prev = 12;
  } else if (prev === "A") {
    prev = 13;
  }
  if (current === "J") {
    current = 10;
  } else if (current === "Q") {
    current = 11;
  } else if (current === "K") {
    current = 12;
  } else if (current === "A") {
    current = 13;
  }
  if (prev > current) {
    console.log(prev, current);
    return "lower"
  } else if (prev < current) {
    console.log(prev, current);
    return "higher"
  } else {
    console.log(prev, current);
    return "equal"
  }
}


function showCardOnButtonClick() {
  updateHowManyCards()
  let randomCard = pickRandomCard(deck);
  console.log(randomCard);
  showCard(randomCard);
  let currentValue = randomCard[0]
  return currentValue;
  }

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
    



btnLower.addEventListener("click", function() {
  let currentVal = showCardOnButtonClick()
  let comparison = compareCards(prevValue, currentVal);
  prevValue = currentVal;
  if (comparison === "lower") {
    updatePoints()
    winSound.play()
  } else {
    updateTries();
    loseSound.play()
  }
   
})
btnSame.addEventListener("click", function() {
  let currentVal = showCardOnButtonClick()
  let comparison = compareCards(prevValue, currentVal);
  prevValue = currentVal;
  if (comparison === "equal") {
    updatePoints()
    winSound.play()
  } else {
    updateTries();
    loseSound.play()
  }
  
})
btnHigher.addEventListener("click", function() {
  let currentVal = showCardOnButtonClick()
  let comparison = compareCards(prevValue, currentVal);
  prevValue = currentVal;
  if (comparison === "higher") {
    updatePoints()
    winSound.play()
  } else {
    updateTries();
    loseSound.play()
  }
  
})

gameOverModal.addEventListener("click", () => {
  gameOverModal.classList.remove("visible");
    deck = createCardDeck();
    pointsCount = -1;
    triesCount = 4;
    cardsLeft = 53;
    updateTries();
    updatePoints();
    updateHowManyCards();
    prevValue = initializeGame(deck);
})