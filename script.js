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
        checkMatch();
    });
};

chooseCards();

function checkMatch() {
    if ($(".flipped").length === 2 ) {
        if($(".flipped").first().data("cardNumber") == $(".flipped").last().data("cardNumber")) {
            cardMatch();
            
        } else {
            cardUnmatch();
            
            

        };
    };
};

function cardMatch() {
    $('.flipped').each(function() {
                $(this).removeClass('flipped').addClass('matched');
              });
}

function cardUnmatch() {
    setTimeout(function() {
                $('.flipped').each(function() {
                  $(this).removeClass('flipped')
                })}, 1000);
}






});