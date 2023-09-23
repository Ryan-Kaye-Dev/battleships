export default class Player {
    constructor(name, gameboard) {
        this.name = name
        this.gameboard = gameboard
    }

    attack(position) {
        this.gameboard.receiveAttack(position)
    }

    randomAttack() {
        let row = Math.floor(Math.random() * this.gameboard.board.length)
        let col = Math.floor(Math.random() * this.gameboard.board.length)
        let position = [row, col]
        if (this.gameboard.missedAttacks.includes(position)) {
            this.randomAttack()
        } else {
            this.attack(position)
        }
    }
}