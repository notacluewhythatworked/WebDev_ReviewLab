var gameDetail = document.getElementById('GameDetails');
var disabledClass = 'disabled';

var gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var playerX = {
    name: 'Player X',
    symbol: 'x',
    cssClass: 'owned-player-x'
};

var playerO = {
    name: 'Player O',
    symbol: 'o',
    cssClass: 'owned-player-o'
};

var currentPlayer = playerX;

//click events

var boardCells = document.getElementsByClassName('board-cell');
for (let i = 0; i < boardCells.length; i++) {
    boardCells[i].addEventListener('click', function(evt){
        if(!evt.target.classList.contains(disabledClass)){

            var cellId = evt.target.id;

            submitMove(cellId.charAt(0), cellId.charAt(1));
        }
    });
}

function submitMove(x, y){
    gameBoard[Number(x)][Number(y)] = currentPlayer.symbol;

    var gameCell = document.getElementById(x+y);

    gameCell.classList.add(currentPlayer.cssClass);
    gameCell.classList.add(disabledClass);

    var someoneWon = checkWin();

    if(someoneWon) {
        gameDetail.innerHTML = '<h2>' + currentPlayer.name + ' wins!</h2>';
        modifyBoard(false, true);
    } else {
        if(currentPlayer.symbol == playerX.symbol){
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
        }
        gameDetail.innerHTML = '<h2>' + currentPlayer.name + "'s turn </h2>";
    }
}

function checkWin(){
    var win = false;
    var tie = false;

    //check rows, check colums, 2 diagonals

    //rows
    for (let i = 0; i < 3; i++) {
        var compareCell = gameBoard[i][0];
        if(compareCell != null && compareCell == gameBoard[i][1] && compareCell == gameBoard[i][2]){
            win = true;
            break;
        }
        
    //colums
    if(!win){
        for (let i = 0; i < 3; i++) {
            var compareCell = gameBoard[0][i];
            if(compareCell != null && compareCell == gameBoard[1][i] && compareCell == gameBoard[2][i]){
                win = true;
                break;
            }
        }
    }

    //diagonals
    if(!win){
        if(gameBoard[0][0] != null && gameBoard[0][0] == gameBoard[1][1] && gameBoard[0][0] == gameBoard[2][2]){
            win = true;
        } else if (gameBoard[0][2] != null && gameBoard[0][2] == gameBoard[1][1] && gameBoard[0][2] == gameBoard[2][0]){
            win = true;
        }
    }

    //nobody won
    if(!win){
        var foundNull = false;
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if(gameBoard[i][j] == null){
                    foundNull = true;
                    break;
                }
            }
        } if(!foundNull){
                cat = true;
                win = true;
        }
    }

    console.log('Win: ' + win);

    gameDetail.innerHTML = '<h2>CATS GAME'
    return win;
}

function modifyBoard(reset, disable){
    var grid00 = document.getElementById('00');
    var grid01 = document.getElementById('01');
    var grid02 = document.getElementById('02');

    var grid10 = document.getElementById('10');
    var grid11 = document.getElementById('11');
    var grid12 = document.getElementById('12');

    var grid20 = document.getElementById('20');
    var grid21 = document.getElementById('21');
    var grid22 = document.getElementById('22');

    if(reset){
        grid00.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid01.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid02.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid10.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid11.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid12.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid20.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid21.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
        grid22.classList.remove(playerX.cssClass, playerO.cssClass, disabledClass);
    }

    if(disable){
        grid00.classList.add(disabledClass)
        grid01.classList.add(disabledClass);
        grid02.classList.add(disabledClass);
        grid10.classList.add(disabledClass);
        grid11.classList.add(disabledClass);
        grid12.classList.add(disabledClass);
        grid20.classList.add(disabledClass);
        grid21.classList.add(disabledClass);
        grid22.classList.add(disabledClass);

    }

}

document.getElementById('NewGame').addEventListener('click', newGame);
function newGame(evt){
    gameBoard = [[null, null, null],[null, null, null],[null, null, null]];
    currentPlayer = playerX;
    gameDetail.innerHTML = '<h2>' + currentPlayer.name + "'s turn</h2>";

    modifyBoard(true, false);
}

//start the game
newGame();