function Createplayer(){
    let playerName,marker;
    let setPlayer =  (playerName1,marker1) => {
        playerName = playerName1;
        marker = marker1;
    }

    let getMarker = () => {
        return marker;
    }

    let getPlayerName = () => {
        return playerName;
    }

    let printPlayerinfo = () => {
        console.log(`The player name is ${playerName} and their marker is ${marker}`);
    }
    return {setPlayer,printPlayerinfo,getMarker,getPlayerName};
}

function gameBoard(){
    board = [['','',''],['','',''],['','','']];

    let resetgameBoard = () => {
        board = [['','',''],['','',''],['','','']]; 
    }

    let displayBoard = () => {
        console.log(board);
    }

    let isPossible = (row,col) => {
        if(board[row][col] === '') return true;
        return false;
    }

    let placeMarker = (row,col,player) => {
        if(board[row][col]!=''){
            return false;
        }
        board[row][col] = player.getMarker();
        return true;
    }

    let checkBoard = ()=> {
        let isDraw = true;
        for(let i = 0;i<3;i++){
            for(let j = 0;j<3;j++){
                if(board[i][j] === ''){
                    isDraw = false;
                }
            }
        }

        if(isDraw) return 3;

        let winner = -1;

        // Rows check

        for(let i = 0;i<3;i++){
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][1]!=''){
                winner = (i+1)*10;
                break;
            }
        }

        // cols check

        for(let j = 0;j<3 && winner=== -1 ;j++){
            if(board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[1][j]!=''){
                winner = (j+1)*100;
                break;
            }
        }

        // diagonal check - 1

        if(winner === -1 && board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1]!=''){
            winner = 500;
        }

        // diagonal check - 2

        if(winner === -1 && board[0][2] === board[1][1] && board[2][0]===board[1][1] &&  board[1][1]!=''){
            winner = 1000;
        }

        if(winner === -1){
            return 0;
        }
        return winner;
    }
    return {resetgameBoard,displayBoard,placeMarker,checkBoard,isPossible}
}

function gameController(){

    // Intialize the players.
    // Intialize the game board.
    // Take turns input from the players and change the active player 
    // Tell if the game is draw or a winner is present and then make the board inactive.

    const player1 = Createplayer();
    player1.setPlayer("Player-1",'X');
    const player2 = Createplayer();
    player2.setPlayer("Player-2",'O');

    const currentGameBoard = gameBoard();
    
    // Resetting the game board 

    currentGameBoard.resetgameBoard();

    //currentGameBoard.displayBoard();

    let currentPlayer = player1;

    function resetGame(){
        const boardMatrix = document.querySelector('.board-matrix');
        boardMatrix.style.display = 'flex';
        const winnerTextElement = document.querySelector('.winner-text');
        winnerTextElement.innerText = '';
        const winnerDiv = document.querySelector('.winner-div');
        winnerDiv.style.display = 'none';
        currentGameBoard.resetgameBoard();
        const matrixCells = document.querySelectorAll('.cell');
        for(let cell of matrixCells){
            cell.innerHTML = '';
        }
    }

    function changePlayer(){
        if(currentPlayer === player1){
            currentPlayer = player2;
        }
        else{
            currentPlayer = player1;
        }
    }

    // Doing on click functions on all the divs in the matrix;

    function activateDivs(){
        const matrixCells = document.querySelectorAll('.cell');
        for(let cell of matrixCells){
            cell.addEventListener('click',(event)=>{
                if(event.target.classList[0]=== undefined){
                    return;
                }
                else{
                    console.log(event.target.classList[0]);
                    buttonPressed(event.target.classList[0]);
                }
            })
        }
    }
    activateDivs();
    const cellsToMatrix = {
        'one' : [0,0],
        'two' : [0,1],
        'three' : [0,2],
        'four' : [1,0],
        'five' : [1,1],
        'six' : [1,2],
        'seven' : [2,0],
        'eight' : [2,1],
        'nine' : [2,2]
    };

    function buttonPressed(cellNumber){
        const move = cellsToMatrix[cellNumber];
        if(currentGameBoard.isPossible(move[0],move[1])){
            currentGameBoard.placeMarker(move[0],move[1],currentPlayer);
            const currentDiv = document.querySelector('.'+cellNumber);
            if (currentPlayer.getMarker() === 'X'){
                currentDiv.innerHTML = '<img width="96" height="96" src="https://img.icons8.com/plumpy/96/x.png" alt="x"/>';
            }
            else{
                currentDiv.innerHTML = '<img width="96" height="96" src="https://img.icons8.com/plumpy/96/o.png" alt="o"/>';
            }
            let currentGameSituation = currentGameBoard.checkBoard();
            console.log(`The return type is ${currentGameSituation}`);
            if(currentGameSituation!=0){
                if(currentGameSituation === 3){
                    console.log(`Match is drawn!`);
                    winnerAnimation(3);
                    return;
                }
                winnerAnimation(currentGameSituation);
            }
            changePlayer();
        }
        else {
            console.log(`Error!!! on the row: ${move}`);
        }
    }
    
    function printDiv(textToDisplay){
        const boardMatrix = document.querySelector('.board-matrix');
        boardMatrix.style.display = `none`;
        const winnerDiv = document.querySelector('.winner-div');
        winnerDiv.style.display = 'block';
        const winnerTextElement = document.querySelector('.winner-text');
        winnerTextElement.innerText = textToDisplay;
    }

    function winnerAnimation(winnerValue){
        if(winnerValue === 3){
            printDiv("The game is a draw");
        }
        printDiv(`${currentPlayer.getMarker()} is the winner`);
    }


    const newGame = document.querySelector('.newgame').addEventListener('click',() => {
        resetGame();
        currentGameBoard.displayBoard();
        currentPlayer = player1;
    })

}

gameController();