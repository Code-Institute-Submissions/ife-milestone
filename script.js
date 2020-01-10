$(document).ready(function() {

let card = document.getElementsByClassName('card');

let deck = [];
$('.card').each(function() {
    let id = $(this).attr('id');
    deck.push(id);
});

medium();

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
    disableClicks();
    setTimeout(function() {
        $('.flipped').each(function() {
          $(this).removeClass('flipped').addClass('matched')
        })
    enableClicks() 
}, 800);
}

function cardUnmatch() {
    disableClicks();
    setTimeout(function() {
                $('.flipped').each(function() {
                  $(this).removeClass('flipped')
                })
            enableClicks();
        }, 800);
}

function disableClicks() {
    $(".card").addClass("no-click");
}

function enableClicks() {
    $(".card").removeClass("no-click");
}

function medium() {
    $("#medium").click(function() {
        $("div").remove("#card13, #card14, #card15, #card16, #card17, #card18, #card19, #card20");
        var $newdiv;
    for (var i = 0; i < 4; i++) {
        var j = i+13;
        $newdiv = $('<div class="card" data-card-number=' + Math.ceil( (j) / 2) + ' id= card'+ (j) +'/>');
        $('#game').append($newdiv);
    }
    shuffleDeck();
    chooseCards();
    checkMatch();
});
        };






});