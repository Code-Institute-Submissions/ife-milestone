$(document).ready(function() {
 
let card = document.getElementsByClassName('game-card');
let stopwatch = document.getElementsByClassName('timer');

let deck = [];
$('.game-card').each(function() {
    let id = $(this).attr('id');
    deck.push(id);
});

let movesTaken = 1;

startGame();
easy();
medium();
hard();


function startGame() {
    $('#start').click(function() {
        $('div').removeClass('flipped matched no-click');
        shuffleDeck();
        chooseCards();
        checkMatch();
        timer();
        movesTaken = 1;
        seconds = 0;
        minutes = 0;
    });
};

function shuffleDeck() {
    var parent = $("#game");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
};

function chooseCards() {
    $(".game-card").click(function() {
        $(this).addClass("flipped");
        checkMatch();
        $('.move-counter').text(movesTaken);
        movesTaken++;
    });
};

function checkMatch() {
    if ($(".flipped").length === 2 ) {

        if($(".flipped").first().data("cardNumber") == $(".flipped").last().data("cardNumber")) {
            cardMatch();
    
               
            
        } else {
            cardUnmatch();
            
        };
        setTimeout(function() {
            gameComplete()}, 1300);
        
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
    $(".game-card").addClass("no-click");
}

function enableClicks() {
    $(".game-card").removeClass("no-click");
}

function easy() {
    $("#easy").click(function() {
        disableClicks();
        $('#game').removeClass('hard');
        $("div").removeClass('flipped matched').remove("#card9, #card10, #card11, #card12, #card13, #card14, #card15, #card16, #card17, #card18");
    });
};


function medium() {
    $("#medium").click(function() {
        disableClicks();
        $('#game').removeClass('hard');
        $("div").removeClass('flipped matched').remove("#card9, #card10, #card11, #card12, #card13, #card14, #card15, #card16, #card17, #card18");
        var $newdiv;
    for (var i = 0; i < 4; i++) {
        var j = i+9;
        var k = Math.ceil( (j) / 2);
        $newdiv = $('<div class="game-card" data-card-number=' + k + ' id= card'+ (j) + '> <img src="images/'+ k +'.png"></img></div>');
        $('#game').append($newdiv);
    }
    });
};

function hard() {
    $("#hard").click(function() {
        disableClicks();
        $("div").removeClass('flipped matched').remove("#card9, #card10, #card11, #card12, #card13, #card14, #card15, #card16, #card17, #card18");
        var $newdiv;
    for (var i = 0; i < 10; i++) {
        var j = i+9;
        var k = Math.ceil( (j) / 2);
        $newdiv = $('<div class="game-card" data-card-number=' + k + ' id= card'+ (j) + '> <img src="images/'+ k +'.png"></img></div>');
        $('#game').append($newdiv);
    }
    $('#game').addClass('hard');
    });
};



function gameComplete() {
    let numberOfMatched = $('.matched').length;
    let numberOfCards = $('.game-card').length;
    if (numberOfMatched === numberOfCards) {
        disableClicks();
        $('#congratulations').modal('show');
    };
};

var seconds = 0;
var minutes = 0;
var timeTaken;

function timer() {
    timeTaken = setInterval(function() {
        $('.timer').text(minutes + ':' + seconds);
        seconds++;
        if (minutes < 10) {
            if (seconds < 10) {
            $('.timer').text('0' + minutes + ':0' + seconds)
                } else {
                    $('.timer').text('0' + minutes + ':' + seconds)
                }
        } else {
            $('.timer').text(minutes + ':' + seconds)
        }

        if (seconds == 59){
            minutes++;
            seconds = 0;
        }
    }, 1000);
};

});