import { MazeCell } from "../common/model";

const WALL = 8;
const START = 1;
const END = -1;
const EMPTY = 0;
const VISITED = 5;

function convertToMatrix(cells: MazeCell[], startPoint: MazeCell, endPoint: MazeCell): number[][] {
  const matrix: number[][] = [];

  const lastCell = cells[cells.length - 1];
  const maxRow = lastCell.row;
  const maxCol = lastCell.col;
  let currentId = 0;

  for (let i = 0; i <= maxRow; i++) {
    let temp: number[] = [];
    for (let j = 0; j <= maxCol; j++) {
      const isCurrentCellWall = cells[currentId++].rigid;
      temp.push(isCurrentCellWall ? WALL : EMPTY);
    }
    matrix.push(temp);
  }

  const startRow = startPoint.row;
  const startCol = startPoint.col;
  const endRow = endPoint.row;
  const endCol = endPoint.col;

  matrix[startRow][startCol] = START;
  matrix[endRow][endCol] = END;

  return matrix;
}

export default function DjikstraAlgorithm(cells: MazeCell[], startPoint: MazeCell, endPoint: MazeCell) {
  // const matrix: number[][] = convertToMatrix(cells, startPoint, endPoint);

  const finder = new MazePathFinder(cells, startPoint, endPoint);
  finder.findEndPointInMazeRecursively();
}

class MazePathFinder {
  cells: MazeCell[];
  startPoint: MazeCell;
  endPoint: MazeCell;
  map = new Map();

  _maxRow: number = -1;
  _maxCol: number = -1;

  constructor(cells: MazeCell[], startPoint: MazeCell, endPoint: MazeCell) {
    this.cells = cells;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  _createMatrixFromCells() {
    const matrix: number[][] = [];

    const lastCell = this.cells[this.cells.length - 1];
    const maxRow = lastCell.row;
    const maxCol = lastCell.col;

    this._maxCol = maxCol;
    this._maxRow = maxRow;

    let currentId = 0;

    for (let i = 0; i < maxRow; i++) {
      let temp: number[] = [];
      for (let j = 0; j < maxCol; j++) {
        console.log(`row= ${i}, col= ${j}, id= ${currentId}`);
        this.map.set({"row": i,"col": j}, currentId);
        const isCurrentCellWall = this.cells[currentId++].rigid;
        temp.push(isCurrentCellWall ? WALL : EMPTY);
      }
      matrix.push(temp);
    }

    const startRow = this.startPoint.row;
    const startCol = this.startPoint.col;
    const endRow = this.endPoint.row;
    const endCol = this.endPoint.col;

    matrix[startRow][startCol] = START;
    matrix[endRow][endCol] = END;

    console.log(this.map);
    return matrix;
  }

  _isWall(matrix: number[][], row: number, col: number): boolean {
    return matrix[row][col] === WALL;
  }

  _isVisited(matrix: number[][], row: number, col: number) {
    return matrix[row][col] === VISITED;
  }

  _isNotWallNotVisited(matrix: number[][], row: number, col: number) {
    return !this._isWall(matrix, row, col) && !this._isVisited(matrix, row, col);
  }

  _findEndPointInMazeRecursively(matrix: number[][], row: number, col: number) {
    const currentId = this.map.get({"row": row, "col": col});
    if (matrix[row][col] === END) {
      console.log("Found!");
      this.cells[currentId].color = "red";
      return;
    }
    matrix[row][col] = VISITED;
    if(currentId === undefined) {
      console.log(`row= ${row}, col= ${col}`);
      console.log("undefined");
      return;
    }
    this.cells[currentId].color = 'purple';
    console.log(`row= ${row}, col= ${col}`);

    if (row + 1 <= this._maxRow && this._isNotWallNotVisited(matrix, row + 1, col)) {
      this._findEndPointInMazeRecursively(matrix, row + 1, col);
    }

    if (col + 1 <= this._maxCol && this._isNotWallNotVisited(matrix, row, col + 1)) {
      this._findEndPointInMazeRecursively(matrix, row, col + 1);
    }

    if (row - 1 >= 0 && this._isNotWallNotVisited(matrix, row - 1, col)) {
      this._findEndPointInMazeRecursively(matrix, row - 1, col);
    }

    if (col - 1 >= 0 && this._isNotWallNotVisited(matrix, row, col - 1)) {
      this._findEndPointInMazeRecursively(matrix, row, col - 1);
    }
  }

  findEndPointInMazeRecursively() {
    const matrix = this._createMatrixFromCells();
    const startRow = this.startPoint.row;
    const startCol = this.startPoint.col;
    console.log(matrix);

    console.log(`startRow= ${startRow}, startCol= ${startCol}`);
    this._findEndPointInMazeRecursively(matrix, startRow, startCol);
  }
}

