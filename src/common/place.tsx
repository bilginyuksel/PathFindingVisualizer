import { useState } from "react";
import "./index.css";

const INITIAL_BACKGROUND_COLOR: string = 'white';
const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;

type CellInterceptor = () => void

interface MatrixFieldProps {
  width: number;
  height: number;
}

interface MatrixFieldContext {
  mouseLeftClick: boolean;
}


class MazeCell {
  readonly id: number;
  readonly row: number;
  readonly col: number;
  private interceptors: CellInterceptor[] = [];
  private _color: string = 'white';
  private _marked: boolean = false;
  private _rigid: boolean = false;

  constructor(id: number, row: number, col: number) {
    this.id = id;
    this.row = row;
    this.col = col;
  }

  addInterceptor(callback: () => void) {
    this.interceptors.push(callback);
  }

  private runInterceptors() {
    this.interceptors.forEach(func => func());
  }

  set marked(marked: boolean) {
    this._marked = marked;
    this.color = 'purple';
  }

  set color(color: string) {
    this._color = color;
    this.runInterceptors();
  }

  set rigid(rigid: boolean) {
    this._rigid = rigid;
  }

  get color(): string {
    return this._color;
  }

  get marked() {
    return this._marked;
  }

  get rigid() {
    return this._rigid;
  }
}

function createArrayOfCells(width: number, height: number): MazeCell[] {
  const totalCellCount = width * height / (CELL_HEIGHT * CELL_WIDTH);

  const maxRows = width / CELL_WIDTH;
  const maxCols = height / CELL_HEIGHT;

  console.log(`totalCellCount= ${totalCellCount}, maxRows= ${maxRows}, innerHeight= ${maxCols}`);

  const cells = [];
  for (let i = 0; i < totalCellCount; i++) {
    cells.push(new MazeCell(i, Math.floor(i / maxRows), i % maxCols));
  }

  return cells;
}

export default function MatrixField(props: MatrixFieldProps) {
  const context: MatrixFieldContext = {mouseLeftClick: false};

  const cells = createArrayOfCells(props.width, props.height);
  const startCell = cells[100];
  const endCell = cells[828];
  startCell.color = 'black';
  endCell.color = 'black';

  return (<div className="maze-container"
    style={{ width: props.width, height: props.height }}
    onMouseDown={() => context.mouseLeftClick = !context.mouseLeftClick} >

      <input onChange={(e) => cells[parseInt(e.target.value)].color = 'purple'}/>
      <hr></hr>

    {cells.map(cell =>
      <Cell key={`cell-${cell.id}`}
        cell={cell}
        context={context} />
    )}

  </div>);
}

interface CellProps {
  cell: MazeCell;
  context: MatrixFieldContext;
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
    console.log(props.cell);
  };

  return (
    <div className="cell"
      style={{ backgroundColor: props.cell.color }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter} >
    </div>);
}
