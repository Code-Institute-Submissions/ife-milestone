$(document).ready(function () {

    let cards = Array.from(document.getElementsByClassName('game-card'));
    let stopwatch = document.getElementsByClassName('timer');

    let movesTaken;
    let seconds;
    let minutes;
    const unmatchSound = document.getElementById('wrong');
    const matchSound = document.getElementById('correct');

    function disableClicks() {
        $(".game-card").addClass("no-click");
    };
    disableClicks();

    function moveCounter() {
           movesTaken++;
           $('.move-counter').text('Moves:' + movesTaken);
       };
    

    function setToZero() {
        $('#start').toggleClass('hidden');
        $('#reset').toggleClass('hidden');
        movesTaken = 0;
        $('.move-counter').text('Moves: 0');
        seconds = 0;
        minutes = 0;
        $('div').removeClass('flipped matched');
        clearInterval(timeTaken);
        $('.timer').text('Timer: 00:00');
        for (var i = 0; i<cards.length; i++) {
            cards[i].removeEventListener('click', moveCounter);
        };
    }

    function ready() {
        setToZero();
        shuffleDeck();
        chooseCards();
        checkMatch();
        timer();
        enableClicks();
        $(".game-card").addClass("big-shadow")
        cards = Array.from(document.getElementsByClassName('game-card'));
        for (var i = 0; i<cards.length; i++) {
            cards[i].addEventListener('click', moveCounter);
        };
    }

    function reset() {
        disableClicks();
        setToZero();
        $(".pokemon").addClass("hidden");
        $(".pokeball").removeClass("hidden");
        $(".game-card").removeClass("big-shadow")
        $('#reset-message').removeClass('transparent').addClass('opaque animated lightSpeedIn');
        setTimeout(function () {
            $('#reset-message').removeClass('lightSpeedIn').addClass('lightSpeedOut')
        }, 3000);
        setTimeout(function () {
            $('#reset-message').removeClass('lightSpeedOut opaque').addClass('transparent')
        }, 4000);   
    };

    function startGame() {
        $('#start').click(function () {
            ready();
        });
    };

    function resetGame() {
        $('#reset').click(function () {
            reset();
        });
    };

    function shuffleDeck() {
        let parent = $("#game");
        let divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        };
    };

    function chooseCards() {
        $(".game-card").click(function () {
            $(this).addClass("flipped");
            $(this).children(".pokeball").addClass("hidden");
            $(this).children(".pokemon").removeClass("hidden");
            checkMatch();

        });
    };

    function checkMatch() {
        if ($(".flipped").length === 2) {
            if ($(".flipped").first().data("cardNumber") == $(".flipped").last().data("cardNumber")) {
                cardMatch();
            } else {
                cardUnmatch();
            };
            setTimeout(function () {
                gameComplete()
            }, 1300);
        };
    };


    function cardMatch() {
        disableClicks();
        matchSound.play();
        $('.flipped').addClass('animated bounceOut');
        setTimeout(function () {
            $('.flipped').each(function () {
                $(this).addClass('matched').removeClass('animated bounceOut flipped');
                $(this).children("img").toggleClass('hidden');
            });
            enableClicks();
        }, 1100);
    };

    function cardUnmatch() {
        disableClicks();
        unmatchSound.play();
        $('.flipped').each(function () {
            $(this).addClass('animated shake');
        });
        setTimeout(function () {
            $('.flipped').each(function () {
                $(this).removeClass('animated shake flipped');
                $(this).children("img").toggleClass('hidden');
            })
            enableClicks();
        }, 1100);
    };

    function enableClicks() {
        $(".game-card").removeClass("no-click");
    };

    function difficultyReset() {
        disableClicks();
        $("div").removeClass('flipped matched').remove("#card9, #card10, #card11, #card12, #card13, #card14, #card15, #card16, #card17, #card18");
            clearInterval(timeTaken);
            clearTimeout(timeTaken);
            $('.timer').text('Timer: 00:00');
            $('.move-counter').text('Moves: 0'); 
            $('#start').removeClass('hidden');
            $('#reset').addClass('hidden');
            }

    function easy() {
        $(".easy-level").click(function () {
            difficultyReset();
            $('#game').removeClass('hard medium');
        });
    };


    function medium() {
        $(".medium-level").click(function () {
            difficultyReset();
            $('#game').removeClass('hard');
            let $newdiv;
            for (let i = 0; i < 4; i++) {
                let j = i + 9;
                let k = Math.ceil((j) / 2);
                $newdiv = $('<div class="game-card" data-card-number=' + k + ' id= card' + (j) + '> <img src="assets/images/Pokeball_icon.png" alt="" class="pokeball"> <img src="assets/images/' + k + '.png" class="pokemon"></img></div>');
                $('#game').append($newdiv);
            }
            $('#game').addClass('medium');
            $(".pokemon").addClass("hidden");
            $(".pokeball").removeClass("hidden");
        });
    };

    function hard() {
        $(".hard-level").click(function () {
            difficultyReset();
            $('#game').removeClass('medium')
            let $newdiv;
            for (let i = 0; i < 10; i++) {
                let j = i + 9;
                let k = Math.ceil((j) / 2);
                $newdiv = $('<div class="game-card" data-card-number=' + k + ' id= card' + (j) + '> <img src="assets/images/Pokeball_icon.png" alt="" class="pokeball"> <img src="assets/images/' + k + '.png" class="pokemon"></img></div>');
                $('#game').append($newdiv);
            }
            $('#game').addClass('hard');
            $(".pokemon").addClass("hidden");
            $(".pokeball").removeClass("hidden");
        });
    };

    function gameComplete() {
        let numberOfMatched = $('.matched').length;
        let numberOfCards = $('.game-card').length;
        if (numberOfMatched === numberOfCards) {
            disableClicks();
            matchSound.play();
            $('#congratulations').modal('show');
            let finalMinutes = minutes;
            let finalSeconds = seconds;
            let finalMoves = movesTaken;
            $('.total-minutes').text(finalMinutes);
            $('.total-seconds').text(finalSeconds);
            $('.total-moves').text(finalMoves);
            clearTimeout(timeTaken);
        };
    };

    let timeTaken;

    function timer() {
        timeTaken = setInterval(function () {
            $('.timer').text(minutes + ':' + seconds);
            seconds++;
            if (minutes < 10) {
                if (seconds < 10) {
                    $('.timer').text('Timer: 0' + minutes + ':0' + seconds)
                } else {
                    $('.timer').text('Timer: 0' + minutes + ':' + seconds)
                }
            } else {
                if (seconds < 10) {
                    $('.timer').text('Timer:' + minutes + ':0' + seconds)
                } else {
                    $('.timer').text('Timer:' + minutes + ':' + seconds)
                }
            }
            if (seconds == 59) {
                minutes++;
                seconds = 0;
            }
        }, 1000);
    };

    easy();
    medium();
    hard();
    startGame();
    resetGame();
});