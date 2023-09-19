export default class Ship {
    constructor(name, length, position, hits = 0, sunk = false) {
        this.name = name
        this.length = length
        this.hits = hits
        this.sunk = sunk
        this.position = position
    }

    hit(amount = 1) {
        this.hits = this.hits + amount
    }

    isSunk() {
        return this.hits >= this.length
    }
}