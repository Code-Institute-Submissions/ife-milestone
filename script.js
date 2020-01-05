$(document).ready(function() {

let card = document.getElementsByClassName('card');

let deck = [];
$('.card').each(function() {
    let id = $(this).attr('id');
    deck.push(id);
});

function shuffleDeck() {
    var parent = $("#game");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
};

shuffleDeck();

function chooseCards() {
    $(".card").click(function() {
        $(this).addClass("flipped");
    });
};

chooseCards();

function checkMatch() {
    if(flippedCards.length === 2){
        if(flippedCards[0].data-card-number === flippedCards[1].data-card-number){
            match();
        } else {
            unmatch();
        }
    }
};

function match() {
    flippedCards[0].addClass("matched").removeClass("flipped");
    flippedCards[1].addClass("matched").removeClass("flipped");
    flippedCards = [];
}

function unmatch() {
    flippedCards[0].removeClass("flipped");
    flippedCards[1].removeClass("flipped");
    flippedCards = [];
}





});