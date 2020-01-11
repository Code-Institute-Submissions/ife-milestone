$(document).ready(function () {

    let card = document.getElementsByClassName('game-card');
    let stopwatch = document.getElementsByClassName('timer');

    var movesTaken = 0;
    var seconds = 0;
    var minutes = 0;
    const unmatchSound = document.getElementById('wrong');
    const matchSound = document.getElementById('correct');

    easy();
    medium();
    hard();
    startGame();
    moveCounter();
    disableClicks();

    function startGame() {
        $('#start').click(function () {
            movesTaken = 0;
            $('.move-counter').text(0);
            seconds = 0;
            minutes = 0;
            $('div').removeClass('flipped matched no-click');
            shuffleDeck();
            chooseCards();
            checkMatch();
            clearInterval(timeTaken);
            $('.timer').text('Timer: 00:00');
            timer();
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
        $(".game-card").click(function () {
            $(this).addClass("flipped");
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
            })
            enableClicks()
        }, 1100);
    }

    function cardUnmatch() {
        disableClicks();
        unmatchSound.play();
        setTimeout(function () {
            $('.flipped').each(function () {
                $(this).removeClass('flipped')
            })
            enableClicks();
        }, 1100);
    }

    function disableClicks() {
        $(".game-card").addClass("no-click");
    }

    function enableClicks() {
        $(".game-card").removeClass("no-click");
    }

    function easy() {
        $("#easy").click(function () {
            disableClicks();
            $('#game').removeClass('hard');
            $("div").removeClass('flipped matched').remove("#card9, #card10, #card11, #card12, #card13, #card14, #card15, #card16, #card17, #card18");
            clearInterval(timeTaken);
            clearTimeout(timeTaken);
            $('.timer').text('Timer: 00:00');
            $('.move-counter').text('Moves:' + 0);
        });
    };


    function medium() {
        $("#medium").click(function () {
            disableClicks();
            $('#game').removeClass('hard');
            $("div").removeClass('flipped matched').remove("#card9, #card10, #card11, #card12, #card13, #card14, #card15, #card16, #card17, #card18");
            var $newdiv;
            for (var i = 0; i < 4; i++) {
                var j = i + 9;
                var k = Math.ceil((j) / 2);
                $newdiv = $('<div class="game-card" data-card-number=' + k + ' id= card' + (j) + '> <img src="assets/images/' + k + '.png"></img></div>');
                $('#game').append($newdiv);
            }
            clearInterval(timeTaken);
            clearTimeout(timeTaken);
            $('.timer').text('Timer: 00:00');
            $('.move-counter').text('Moves:' + 0);
        });
    };

    function hard() {
        $("#hard").click(function () {
            disableClicks();
            $("div").removeClass('flipped matched').remove("#card9, #card10, #card11, #card12, #card13, #card14, #card15, #card16, #card17, #card18");
            var $newdiv;
            for (var i = 0; i < 10; i++) {
                var j = i + 9;
                var k = Math.ceil((j) / 2);
                $newdiv = $('<div class="game-card" data-card-number=' + k + ' id= card' + (j) + '> <img src="assets/images/' + k + '.png"></img></div>');
                $('#game').append($newdiv);
            }
            $('#game').addClass('hard');
            clearInterval(timeTaken);
            clearTimeout(timeTaken);
            $('.timer').text('Timer: 00:00');
            $('.move-counter').text('Moves:' + 0);
        });
    };

    function gameComplete() {
        let numberOfMatched = $('.matched').length;
        let numberOfCards = $('.game-card').length;
        if (numberOfMatched === numberOfCards) {
            disableClicks();
            $('#congratulations').modal('show');
            var finalMinutes = minutes;
            var finalSeconds = seconds;
            var finalMoves = movesTaken;
            $('.total-minutes').text(finalMinutes);
            $('.total-seconds').text(finalSeconds);
            $('.total-moves').text(finalMoves);
            clearTimeout(timeTaken);
        };
    };

    var timeTaken;

    function moveCounter() {
        $('.game-card').click(function () {
            movesTaken++;
            $('.move-counter').text('Moves:' + movesTaken);
        });
    };


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

});