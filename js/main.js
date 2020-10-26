const btnLower = document.querySelector(".btn-lower")
const btnSame = document.querySelector(".btn-same")
const btnHigher = document.querySelector(".btn-higher")
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
}

function updateTries() {
  const tries = document.querySelector(".tries");
  triesCount--;
  tries.innerHTML = `<strong>${triesCount}</strong>`
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
    



btnLower.addEventListener("click", function() {
  let currentVal = showCardOnButtonClick()
  let comparison = compareCards(prevValue, currentVal);
  prevValue = currentVal;
  if (comparison === "lower") {
    updatePoints()
  } else {
    updateTries();
  }
   
})
btnSame.addEventListener("click", function() {
  let currentVal = showCardOnButtonClick()
  let comparison = compareCards(prevValue, currentVal);
  prevValue = currentVal;
  if (comparison === "equal") {
    updatePoints()
  } else {
    updateTries();
  }
  
})
btnHigher.addEventListener("click", function() {
  let currentVal = showCardOnButtonClick()
  let comparison = compareCards(prevValue, currentVal);
  prevValue = currentVal;
  if (comparison === "higher") {
    updatePoints()
  } else {
    updateTries();
  }
  
})