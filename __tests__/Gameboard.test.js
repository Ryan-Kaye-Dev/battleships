import Ship from "../src/Ship";
import Gameboard from "../src/Gameboard";

describe("gameboard functions", () => {
  let testBoard;

  beforeEach(() => {
    testBoard = new Gameboard(100);
  });

  test("Generates 100 cell board", () => {
    const board = [];
    for (let i = 0; i < 100; i++) {
      board.push({ hasShip: false, isHit: false });
    }
    expect(testBoard.create(100)).toEqual(board);
  });
});
