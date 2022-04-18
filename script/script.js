const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'
const lockMode = false
const firstCard = null
const secondCard = null



startGame()
play()

function startGame() {



    initializeCards(game.createCardsFromTechs())


}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard');

    gameBoard.innerHTML = ''
    game.cards.forEach((card) => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);


}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/" + card.icon + ".jpg";
        cardElementFace.appendChild(iconElement)

    } else {
        let iconBack = document.createElement('img');

        iconBack.src = "./imagens/bandeira.jpg";
        cardElementFace.appendChild(iconBack)
    }
    element.appendChild(cardElementFace)
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip')
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver')
                    gameOverLayer.style.display = 'flex'
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }

    }

}

function restart() {
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById('gameOver')
    gameOverLayer.style.display = 'none'

}

function start() {
    game.clearCards
    startGame()
    let gameOverLayer = document.getElementById('gamePlay')
    gameOverLayer.style.display = 'none'
    let gameStart = document.getElementById('gameBoard')
    gameStart.style.display = 'grid'
    document.getElementById('song').play().document.getElementById('song').loop = true

}