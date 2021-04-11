import { useState } from "react";
import {MazeCell, Observer, PathFinderAlgorithm } from "./model";
import "./index.css";

const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;

interface MatrixFieldProps {
  width: number;
  height: number;
  observer: Observer;
  algorithm: PathFinderAlgorithm;
}

interface MatrixFieldContext {
  mouseLeftClick: boolean;
}

interface CellProps {
  cell: MazeCell;
  context: MatrixFieldContext;
}

function createArrayOfCells(width: number, height: number): MazeCell[] {
  const totalCellCount = width * height / (CELL_HEIGHT * CELL_WIDTH);

  // const maxRows = height / CELL_HEIGHT;
  const maxRows = 30;
  // const maxCols = width / CELL_WIDTH;
  const maxCols = 67;

  console.log(`totalCellCount= ${totalCellCount}, maxRows= ${maxRows}, maxCols= ${maxCols}`);
  let currentRow = 0;
  let currentCol = 0;

  const cells = [];
  for (let i = 0; i <= 2039; i++) {
    cells.push(new MazeCell(i, currentRow, currentCol));
    if(currentCol === maxCols) {
      currentCol = 0;
      currentRow++;
    } else {
      currentCol++;
    }
  }

  return cells;
}

export default function MatrixField(props: MatrixFieldProps) {
  const context: MatrixFieldContext = { mouseLeftClick: false };

  const cells = createArrayOfCells(props.width, props.height);
  const startCell = cells[100];
  const endCell = cells[828];
  startCell.color = 'black';
  endCell.color = 'black';

  props.observer.register(() => props.algorithm(cells, startCell, endCell));

  return (<div className="maze-container"
    style={{ width: props.width, height: props.height }}
    onMouseDown={() => context.mouseLeftClick = !context.mouseLeftClick} >

    <input onChange={(e) => cells[parseInt(e.target.value)].color = 'purple'} />
    <hr></hr>

    {cells.map(cell =>
      <Cell key={`cell-${cell.id}`}
        cell={cell}
        context={context} />
    )}

  </div>);
}

function Cell(props: CellProps) {
  const [flag, updateState] = useState(false);

  props.cell.addInterceptor(() => updateState(!flag));

  const onMouseEnter = () => {
    if (!props.context.mouseLeftClick) return;
    makeRigid();
  };

  const onMouseDown = () => makeRigid();

  const makeRigid = () => {
    props.cell.color = 'green';
    props.cell.rigid = true;
    updateState(!flag); // ignored statement
  };

  return (
    <div className="cell"
      style={{ backgroundColor: props.cell.color }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter} >
    </div>);
}
