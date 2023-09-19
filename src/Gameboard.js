export default class Gameboard {
    constructor(size = 10) {
        this.size = size
        this.board = this.create()
    }

    create() {
        let board = [];
        for (let i = 0; i < this.size; i++) {
          let row = [];
          for (let j = 0; j < this.size; j++) {
            row.push({ hasShip: false, isHit: false });
          }
          board.push(row);
        }
        return board;
      }

    isPlacementPossible(ship, positionArray, axis) {
        const row = positionArray[0];
        const col = positionArray[1];
        const shipLength = ship.length;

        if(
            axis === 'horizontal' &&
            col + shipLength > this.board[0].length //checks horizontal boundary
        ) {
            return false;
        } else if (
            axis === 'vertical' &&
            row + shipLength > this.board.length // checks vertical boundary
        ) {
            return false
        }

        // Check if there's already a ship in the position
        for ( let i = 0; i < shipLength; i++) {
            if (axis === 'horizontal') {
                if (this.board[row][col + i].hasShip) {
                    return false // ship already here
                }
            } else if (axis === 'vertical') {
                if (this.board[row +i][col].hasShip) {
                    return false // ship already here
                }
            }
        }
        return true // all checks passed, placement possible
    }
}