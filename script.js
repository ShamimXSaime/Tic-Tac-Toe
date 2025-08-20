const cells=document.querySelectorAll(".cell");
const message=document.getElementById("message");
const restartButton=document.getElementById("restart");

let board=["", "", "", "", "", "", "", "", ""];
let currentPlayer="X";
let isGameActive=true;
message.textContent=`Player ${currentPlayer}'s turn`;

const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

function handleCellClick(e){
    const cell=e.target;
    const index=cell.getAttribute("data-index");

    if(board[index] !== ""|| !isGameActive){
        return;
    }

    board[index]=currentPlayer;
    cell.textContent=currentPlayer;

    if (checkWin()) {
        message.textContent=`🎉 Player ${currentPlayer} Wins 🥂`;
        isGameActive=false;
        return;
    }

    if (checkDraw()) {
        message.textContent=`🫱🏻‍🫲🏽 It's a Draw 🫂`;
        isGameActive=false;
        return;
    }

    //currentPlayer=currentPlayer==="X"?"O":"X";
    //message.textContent=`Player ${currentPlayer}'s turn`;

    currentPlayer="O";
    message.textContent=`🤖 AI's turn`;
    setTimeout(aiMove, 1000);
}

function aiMove(){
    let move;

    move=criticalMove("O");

    if(move===null){
        move=criticalMove("X");
    }

    if(move===null){
        let emptyCells=board.map((val, idx)=>val===""?idx:null).filter(v=>v!==null);
    if(emptyCells.length===0)
        return

    const randomIndex=emptyCells[Math.floor(Math.random()*emptyCells.length)];
    move=randomIndex;
    }
    
    board[move]="O";
    cells[move].textContent="O";

    if(checkWin()){
        message.textContent=`🤖 AI Wins!`;
        isGameActive=false;
        return;
    }

    if(checkDraw()){
        message.textContent=`🫱🏻‍🫲🏽 It's a Draw 🫂`;
        isGameActive=false;
        return;
    }

    currentPlayer = "X";
    message.textContent=`Player ${currentPlayer}'s turn`;
}

function criticalMove(player){
    for(let combo of winningCombos){
        const [a,b,c]=combo;
        const values=[board[a], board[b], board[c]];

        if(values.filter(v=>v===player).length===2&&values.includes("")){
            return combo[values.indexOf("")];
        }
    }
    return null;
}

function checkWin(){
    return winningCombos.some(combo => {
        const[a,b,c]=combo;
        return board[a]&&board[a]===board[b]&&board[a]===board[c];
    });
}

function checkDraw() {
    return board.every(cell => cell!=="")
}

function restartGame(){
    board=["", "", "", "", "", "", "", "", ""];
    isGameActive=true;
    currentPlayer="X";
    message.textContent=`Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent="");
}