import Ship from "../src/Ship";
import Gameboard from "../src/Gameboard";

describe("gameboard functions", () => {
  let testBoard;
  let testCarrier;

  beforeEach(() => {
    testBoard = new Gameboard(10);
    testCarrier = new Ship("Carrier", 5);
  });

  test("Generates 10x10 board", () => {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push({ hasShip: false, isHit: false });
      }
      board.push(row);
    }
    expect(testBoard.create(10)).toEqual(board);
  });

  test("Cannot place ship out of bounds of the columns.", () => {
    expect(
      testBoard.isPlacementPossible(testCarrier, [0, 7], "horizontal")
    ).toBe(false);
  });

  test("Cannot place ship out of bounds of the rows.", () => {
    expect(testBoard.isPlacementPossible(testCarrier, [7, 0], "vertical")).toBe(
      false
    );
  });

  test("Cannot place ship where ship already exists", () => {
    testBoard.board[0][0].hasShip = true;
    expect(
      testBoard.isPlacementPossible(testCarrier, [0, 0], "horizontal")
    ).toBe(false);
  });

  test("Places Ship on all squares if move valid", () => {
    testBoard.place(testCarrier, [0, 0], "horizontal");
    for (let i = 0; i < testCarrier.length; i++) {
      expect(testBoard.board[0][i].hasShip).toBe(true);
    }
  });

  test("Doesn't Place Ship on any squares if move is invalid", () => {
    testBoard.place(testCarrier, [0, 7], "vertical");
    for (let i = 0; i < testCarrier.length; i++) {
      expect(testBoard.board[i][0].hasShip).toBe(false);
    }
  });

  test("Receives Attack on Empty Square", () => {
    testBoard.receiveAttack([0,0]);
    expect(testBoard.board[0][0].isHit).toBe(true);
  });

  test("Receives Attack on Ship Square, adds 1 to ship hits", () => {
    testBoard.place(testCarrier, [0, 0], "horizontal");
    testBoard.receiveAttack([0,0]);
    expect(testBoard.board[0][0].isHit).toBe(true);
    expect(testCarrier.hits).toBe(1);
  });
});
