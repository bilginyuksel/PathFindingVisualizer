import {useState} from "react";
import "./index.css";

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
  initialColor: string;
}

// Currently just returning sample data.
// In the future it can return cells information.
function createArrayOfCells(count: number) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
}

export default function MatrixField(props: MatrixFieldProps) {
  const context: MatrixFieldContext = { mouseLeftClick: false };

  const array = createArrayOfCells(2000);

  return (<div onMouseDown={() => context.mouseLeftClick = true}
    onMouseUp={() => context.mouseLeftClick = false}>

    {array.map(element =>
      <Cell id={0} row={1} col={3} initialColor={'black'} context={context} />
    )}

  </div>);
}

function Cell(props: CellProps) {
  const [color, setColor] = useState(props.initialColor);
  const [backgroundColor, setBackgroundColor] = useState('gray');
  const [doubleClickTracker, setDoubleClickTracker] = useState(0);

  const onMouseDown = () => {
    setColor('green');
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
      setColor('gray');
      setBackgroundColor('gray');
      setDoubleClickTracker(0);
    }
  };

  return (
    <div className="cell"
      style={{border: color + " solid 2px", backgroundColor: backgroundColor }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}>
    </div>);
}