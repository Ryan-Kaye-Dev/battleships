export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.create();
    this.fleet = [];
    this.missedAttacks = [];
  }

  create() {
    let board = [];
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        const cell = { hasShip: false, isHit: false, row: i, col: j };
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }
  

  isPlacementPossible(ship, positionArray, axis) {
    const row = positionArray[0];
    const col = positionArray[1];
    const shipLength = ship.length;

    if (
      axis === "horizontal" &&
      col + shipLength > this.board[0].length //checks horizontal boundary
    ) {
      return false;
    } else if (
      axis === "vertical" &&
      row + shipLength > this.board.length // checks vertical boundary
    ) {
      return false;
    }

    // Check if there's already a ship in the position
    for (let i = 0; i < shipLength; i++) {
      if (axis === "horizontal") {
        if (this.board[row][col + i].hasShip) {
          return false; // ship already here
        }
      } else if (axis === "vertical") {
        if (this.board[row + i][col].hasShip) {
          return false; // ship already here
        }
      }
    }
    return true; // all checks passed, placement possible
  }

  place(ship, positionArray, axis) {
    if (this.isPlacementPossible(ship, positionArray, axis)) {
      const row = positionArray[0];
      const col = positionArray[1];
      const shipCells = [];

      for (let i = 0; i < ship.length; i++) {
        if (axis === "horizontal") {
          this.board[row][col + i].hasShip = true;
          shipCells.push([row, col + i]);
        } else if (axis === "vertical") {
          this.board[row + i][col].hasShip = true;
          shipCells.push([row + i, col]);
        }
      }
      // push the ship information to the board ship array
      this.fleet.push({
        ship,
        positions: shipCells,
        axis,
      });
    }
  }

  receiveAttack(positionArray) {
    const row = positionArray[0];
    const col = positionArray[1];
    let shipHit = false;

    // check if the position has already been hit
    // if not, set isHit to true
    if (!this.board[row][col].isHit) {
      this.board[row][col].isHit = true;
    }
    
    // check if any ships in the fleet Array are in the position
    for (let i = 0; i < this.fleet.length; i++) {
      const currentShip = this.fleet[i];
      currentShip.positions.forEach((shipPosition) => {
        const [shipRow, shipCol] = shipPosition;
        if (shipRow === row && shipCol === col) {
          currentShip.ship.hit();
          shipHit = true;
        }
      });
    }
    

    if (!shipHit) {
      this.missedAttacks.push(positionArray);
    }    
  }

  allShipsSunk() {
    return this.fleet.every((ship) => ship.ship.isSunk());
  }
}
