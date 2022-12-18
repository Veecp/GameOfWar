let deckID
const cardsContainer = document.getElementById("cards")
const newDeckButton = document.getElementById("new-deck")
const drawCardsButton = document.getElementById("draw-cards")
const message = document.getElementById("message")
const remainingText = document.getElementById("remaining-element")
const computerScore = document.getElementById("computer-score-element")
const myScore = document.getElementById("my-score-element")
var computerTotalScore = 0
var myTotalScore = 0

async function getCards() {
	const response = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
	const data = await response.json()
	remainingText.textContent = `Cards left: ${data.remaining}`
	deckID = data.deck_id
}

newDeckButton.addEventListener("click", getCards)

drawCardsButton.addEventListener("click", async () => {
	const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
	const data = await response.json()

	  remainingText.textContent = `Cards left: ${data.remaining}`
	  cardsContainer.children[0].innerHTML = `
		<img src = ${data.cards[0].image} class="card">
	  `
	  cardsContainer.children[1].innerHTML = `
		<img src = ${data.cards[1].image} class="card">
	  `
	  const winMessage = evaluateCardWinner(data.cards[0], data.cards[1])
	  message.textContent = winMessage

	  if (data.remaining === 0) {
		drawCardsButton.disabled = true

		if (computerTotalScore > myTotalScore) {
			message.textContent = "The computer is your master. Obey."
		} else if (myTotalScore > computerTotalScore) {
			message.textContent = "You won!"
		} else {
			message.textContent = "It's a tie game."
		}
	  }
	})

function evaluateCardWinner(card1, card2) {
	const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
	const card1ValueIndex = cardValues.indexOf(card1.value)
	const card2ValueIndex = cardValues.indexOf(card2.value)

	if (card1ValueIndex > card2ValueIndex) {
		computerTotalScore++
		computerScore.textContent = `Computer score: ${computerTotalScore}`
		console.log(computerTotalScore)
		return "The computer wins!"
	} else if (card1ValueIndex < card2ValueIndex) {
		myTotalScore++
		myScore.textContent = `My score: ${myTotalScore}`
		return "You win!"
	} else {
		return "War. What is it good for? Absolutely nuthin'!"
	}
}

// const oneCard = {
//   value: "8"
// }

// const twoCard = {
//   value: "JACK"
// }

// evaluateCardWinner(oneCard, twoCard)