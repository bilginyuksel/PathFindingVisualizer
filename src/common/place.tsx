import { useState } from "react";
import "./index.css";

const INITIAL_BACKGROUND_COLOR: string = 'white';
const CELL_ROW_WIDTH = 30;
const CELL_COL_WIDTH = 30;

interface MatrixFieldProps {
  column: number;
  row: number;
}

interface MatrixFieldContext {
  mouseLeftClick: boolean;
}

export interface CellProps {
  id: number;
  row: number;
  col: number;
  context: MatrixFieldContext;
  initialBackgroundColor: string;
}

// Currently just returning sample data.
// In the future it can return cells information.
function createArrayOfCells(innerWidth: number, outerWidth: number, activeMazeFieldPercentage: number) {
  const totalScreenSize = innerWidth * outerWidth;
  console.log(`innerWidth= ${innerWidth}, outerWidth= ${outerWidth}`)
  const cells = [];
  for (let i = 0; i < activeMazeFieldPercentage; i++) {
    cells.push({
      id: i,
      row: i,
      col: i,
      initialBackgroundColor: INITIAL_BACKGROUND_COLOR
    });
  }
  return cells;
}

export default function MatrixField(props: MatrixFieldProps) {
  const context: MatrixFieldContext = { mouseLeftClick: false };

  const innerWidth = window.innerWidth;
  const outerWidth = window.outerWidth;

  const cells = createArrayOfCells(innerWidth, outerWidth, 80);

  return (<div className="maze-container"
    onMouseDown={() => context.mouseLeftClick = true}
    onMouseUp={() => context.mouseLeftClick = false}>

    {cells.map(cell =>
      <Cell id={cell.id}
        key={`cell-${cell.id}`}
        row={cell.row}
        col={cell.col}
        initialBackgroundColor={cell.initialBackgroundColor}
        context={context} />
    )}

  </div>);
}

function Cell(props: CellProps) {
  const [backgroundColor, setBackgroundColor] = useState(props.initialBackgroundColor);
  const [doubleClickTracker, setDoubleClickTracker] = useState(0);

  const onMouseDown = () => {
    setBackgroundColor('green');
  };

  const onMouseEnter = () => {
    if (props.context.mouseLeftClick) {
      onMouseDown();
    }
  };

  const onMouseUp = () => {
    setDoubleClickTracker(doubleClickTracker + 1);
    if (doubleClickTracker === 2) {
      setBackgroundColor('white');
      setDoubleClickTracker(0);
    }
  };

  return (
    <div className="cell"
      style={{ backgroundColor: backgroundColor }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}>
    </div>);
}
