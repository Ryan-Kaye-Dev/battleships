import { createBoards, startGame, randomlyPlaceShips, updateBoards, resetBoard } from './gameHandler.js';
import './style.css';
import Gameboard from './Gameboard.js';

// Create references to the player boards
const player1Board = document.querySelector('#player1Board');
const player2Board = document.querySelector('#player2Board');

// Create new game boards
const p1board = new Gameboard();
const p2board = new Gameboard();

// Initialize the game and place ships
createBoards();
startGame(p1board, p2board);

// Update the boards to reflect initial ship placements
updateBoards(p1board, p2board);

const randomButton = document.querySelector('#randomButton');
randomButton.addEventListener('click', () => {
    resetBoard(p1board); // Reset player 1's board
    resetBoard(p2board); // Reset player 2's board
    randomlyPlaceShips(p1board);
    randomlyPlaceShips(p2board);
    updateBoards(p1board, p2board);
});

const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        const row = cell.dataset.row; // Access the row attribute from dataset
        const col = cell.dataset.col; // Access the col attribute from dataset
        
        p1board.receiveAttack([row, col]);
        cell.classList.add("hit");
    });
});



