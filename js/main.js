const btnLower = document.querySelector(".btn-lower")
const btnSame = document.querySelector(".btn-same")
const btnHigher = document.querySelector(".btn-higher")

function pickRandomCard() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
  const suit = ["hearts", "diamonds", "clubs", "spades"]
  let rand1 = (Math.floor(Math.random() * 12));
  let rand2 = (Math.floor(Math.random() * 4));
  let randomCard = [numbers[rand1], suit[rand2]]
  console.log(randomCard);
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

  let prevCard = pickRandomCard();
  let savePrevCardValue = prevCard[0];
  let usedCards = [];
  usedCards.push(prevCard.join(" "));
  console.log(usedCards);
  showCard(prevCard)
  let pointsCount = 0;
  let triesCount = 3;
  let cardsLeft = 52;




btnLower.addEventListener("click", function() {})
btnSame.addEventListener("click", function() {})
btnHigher.addEventListener("click", function() {})