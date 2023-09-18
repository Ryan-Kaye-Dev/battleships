export default class Gameboard {
    constructor(size = 100) {
        this.size = size
    }

    create() {
        let board = [];
        for (let i = 0; i < this.size; i++) {
          board.push({ hasShip: false, isHit: false});  
        }
        return board
    }
}