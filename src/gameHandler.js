import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";
import { fullFleet } from "./fullFleet.js";

export function createBoards() {
  const p1board = new Gameboard();
  const player1Board = document.createElement("div");
  player1Board.classList.add("board");
  player1Board.classList.add("p1-board");

  // Inside createBoards function
  p1board.create().forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    row.forEach((cell) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.row = cell.row;
      cellDiv.dataset.col = cell.col;
      rowDiv.appendChild(cellDiv);
    });

    console.log("Row created:", rowDiv); // Check if rows are created
    player1Board.appendChild(rowDiv);
  });

  console.log("Player 1 Board:", player1Board); // Check player1Board

  const p2board = new Gameboard();
  const player2Board = document.createElement("div");
  player2Board.classList.add("board");
  player2Board.classList.add("p2-board");

// Inside createBoards function
p2board.create().forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    row.forEach((cell) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.row = cell.row;
      cellDiv.dataset.col = cell.col;
      rowDiv.appendChild(cellDiv);
    });

    console.log("Row created:", rowDiv); // Check if rows are created
    player2Board.appendChild(rowDiv);
  });

  console.log("Player 1 Board:", player1Board); // Check player1Board
  const boardsContainer = document.createElement("div");
  boardsContainer.id = "boardsContainer";
  boardsContainer.appendChild(player1Board);
  boardsContainer.appendChild(player2Board);
  document.body.appendChild(boardsContainer);

  return player1Board, player2Board;
}

export function startGame(p1board, p2board) {
  const player1 = new Player("Player 1", p1board);
  const player2 = new Player("Player 2", p2board);
  const players = [player1, player2];
  let currentPlayer = players[0];
  let opponent = players[1];
  let gameOver = false;
}

export function randomlyPlaceShips(gameboard) {
  let fleet = fullFleet;
  const ships = [];

  fleet.forEach((ship) => {
    let isValidPlacement = false;
    while (!isValidPlacement) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      let position = [row, col];
      let axis = Math.random() < 0.5 ? "horizontal" : "vertical";
      if (gameboard.isPlacementPossible(ship, position, axis)) {
        const newShip = new Ship(ship.name, ship.length);
        gameboard.place(newShip, position, axis);
        ships.push(newShip);
        isValidPlacement = true;
      }
    }
  });
  return ships;
}

export function updateBoards(p1board, p2board) {
  // Get references to the player boards
  const player1Board = document.querySelector(".p1-board");
  const player2Board = document.querySelector(".p2-board");

  // Iterate over rows in p1board
  p1board.board.forEach((row, rowIndex) => {
    // Iterate over cells in the row
    row.forEach((cell, colIndex) => {
      const cellDiv = player1Board
        .querySelectorAll(".row")
        [rowIndex].querySelectorAll(".cell")[colIndex];
      if (cell.isHit) {
        cellDiv.classList.add("hit");
      } else if (cell.hasShip) {
        cellDiv.classList.add("hasShip");
      }
    });
  });

  // Iterate over rows in p2board
  p2board.board.forEach((row, rowIndex) => {
    // Iterate over cells in the row
    row.forEach((cell, colIndex) => {
      const cellDiv = player2Board
        .querySelectorAll(".row")
        [rowIndex].querySelectorAll(".cell")[colIndex];
      if (cell.isHit) {
        cellDiv.classList.add("hit");
      } else if (cell.hasShip) {
        cellDiv.classList.add("hasShip");
      }
    });
  });
}

export function resetBoard(gameboard) {
  // Iterate over rows
  for (let rowIndex = 0; rowIndex < gameboard.size; rowIndex++) {
    // Iterate over cells in the row
    for (let colIndex = 0; colIndex < gameboard.size; colIndex++) {
      // Reset cell properties
      gameboard.board[rowIndex][colIndex].isHit = false;
      gameboard.board[rowIndex][colIndex].hasShip = false;

      // Clear the class list of the cell element
      const cellElements = document.querySelectorAll(".cell");
      cellElements.forEach((cellElement) => {
        cellElement.classList.remove("hit");
        cellElement.classList.remove("hasShip");
      });
    }
  }
}
