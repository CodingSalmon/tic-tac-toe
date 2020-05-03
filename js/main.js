/*----- constants -----*/
const player = {
    '1': 'X',
    '-1': 'O'
};
/*----- app's state (variables) -----*/
let turn;
let winner;
let board;
/*----- cached element references -----*/
boardEl = document.querySelectorAll('#game-board > div');
msg = document.querySelector('#msg');
/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', init);
document.querySelector('#game-board').addEventListener('click',handleClick);
/*----- functions -----*/
init();

function init(){
    board = Array(9).fill(null);
    turn = 1;
    winner = null;
    render();
};

function render(){
    //Render board
    boardEl.forEach(function(posArr, posIdx){
        const div = document.getElementById(`pos${posIdx}`);
        div.innerText = board[posIdx];
    });
    //Check for winner
    winnerCheck();
    tieCheck();
    //Render message
    if(winner){
        if(winner === 'C'){
            msg.innerText = `It's a tie.`;
            return;
        }
        else{
            turn *= -1;
            msg.innerText = `Player ${player[turn]} has won!`;
            return;
        }
    }
    else msg.innerText = `It is ${player[turn]}'s Turn`;
};

function handleClick(e){
    //Get position clicked on board
    let posIdx = Array.from(boardEl).indexOf(e.target);
    //Ensure position clicked isn't full or game isn't over
    if(board[posIdx] !== null || winner) return;
    //Assign position value
    board[posIdx] = player[turn];
    //Change turn
    turn *= -1;
    render();
};

function winnerCheck(){
    if((board[0] + board[1] + board[2] === 'XXX') || (board[0] + board[1] + board[2] === 'OOO')){
        winner = player[turn];
        return true;
    }
    if((board[0] + board[3] + board[6] === 'XXX') || (board[0] + board[3] + board[6] === 'OOO')){
        winner = player[turn];
        return true;
    }
    if((board[0] + board[4] + board[8] === 'XXX') || (board[0] + board[4] + board[8] === 'OOO')){
        winner = player[turn];
        return true;
    }
    if((board[1] + board[4] + board[7] === 'XXX') || (board[1] + board[4] + board[7] === 'OOO')){
        winner = player[turn];
        return true;
    }
    if((board[2] + board[4] + board[6] === 'XXX') || (board[2] + board[4] + board[6] === 'OOO')){
        winner = player[turn];
        return true;
    }
    if((board[2] + board[5] + board[8] === 'XXX') || (board[2] + board[5] + board[8] === 'OOO')){
        winner = player[turn];
        return true;
    }
    if((board[3] + board[4] + board[5] === 'XXX') || (board[3] + board[4] + board[5] === 'OOO')){
        winner = player[turn];
        return true;
    }
    if((board[6] + board[7] + board[8] === 'XXX') || (board[6] + board[7] + board[8] === 'OOO')){
        winner = player[turn];
        return true;
    }
    return false;
};

function tieCheck(){
    if(!winnerCheck() && (board.join('').length === 9)){
        winner = 'C';
    }
};