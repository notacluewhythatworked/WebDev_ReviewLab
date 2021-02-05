var rock = "Rock";
var paper = "Paper";
var scissors = "Scissors";

var player1Score = 0;
var player2Score = 0;
var numberToWin = 3;
var player2Choice; 

$(function(){
    //when page is done loading
    player2Choice = getComputerMove();
    console.log("Player 2: " + player2Choice);

    $(".move-rock").on('click', function(evt) {
        console.log(rock);
        checkForWin(rock, player2Choice);

        player2Choice = getComputerMove();
        console.log("Player 2: " + player2Choice);
    });

    $('.move-paper').click(function(evt) {
        console.log(paper);
        checkForWin(paper, player2Choice);

        player2Choice = getComputerMove();
        console.log("Player 2: " + player2Choice);
    });

    $('.move-scissors').click(function(evt) {
        console.log(scissors);
        checkForWin(scissors, player2Choice);

        player2Choice = getComputerMove();
        console.log("Player 2: " + player2Choice);
    });

    $('#BtnNewGame').click(function(){
        resetGame();
    });
});

function resetGame(){
    console.log('New Game!');
    player1Score = 0;
    player2Score = 0;
    $('#GameData').empty();
    $('.new-game').hide();
    $('.move-options').show();

    player2Choice = getComputerMove();
    console.log('Player 2: ' + player2Choice);
}

function showMove(player1Move, player2Move){
    var move = '<div>';
    move += '<img src="images/' + player1Move + '.png" class="icon" /> ' + player1Move;
    move += ' VS. ';
    move += '<img src="images/' + player2Move + '.png" class="icon" /> ' + player2Move;
    move += '</div>';

    $('#GameData').prepend(move);
}

function checkForWin(player1Move, player2Move){
    showMove(player1Move, player2Move);
    if(player1Move == player2Move){
        //Tie
        $('#GameData').prepend("<div class='result result-tie'>That's a Tie!</div>");
        
    } else if (player1Move == paper && player1Move == rock){
        //WIN
        player1Score += 1;
        $('#GameData').prepend("<div class='result result-win'>You won!</div>");

    } else if (player1Move == rock && player2Move == scissors){
        //WIN
        player1Score += 1;
        $('#GameData').prepend("<div class='result result-win'>You won!</div>");

    } else if (player1Move == scissors && player2Move == paper){
        //WIN
        player1Score += 1;
        $('#GameData').prepend("<div class='result result-win'>You won!</div>");

    } else {
        //Lost
        player2Score += 1;
        $('#GameData').prepend("<div class='result result-loss'>You lost!</div>");

    }

    //someone win game?
    if (player1Score == numberToWin){
        //Player 1 won
        $('#GameData').prepend("<div class='result game-winner'>Player 1 WON!</div>");
        $('.new-game').show();
        $('.move-options').hide();
    } else if (player2Score == numberToWin){
        //Player 2 won
        $('#GameData').prepend("<div class='result game-loser'>Player 2 WON!</div>");
        $('.new-game').show();
        $('.move-options').hide();
    }
}

function getComputerMove(){
    var chosenMove;
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber){
        case 1:
            chosenMove = rock;
            break;
        case 2:
            chosenMove = paper;
            break;
        case 3:
            chosenMove = scissors;
            break;
    }
    return chosenMove;
}