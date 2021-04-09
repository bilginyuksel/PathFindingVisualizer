import { useState } from "react";

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

export default function MatrixField(props: MatrixFieldProps) {
  const context: MatrixFieldContext = { mouseLeftClick: false };

  const array = [0,1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,1,1,1,1,1,1,1,1,1,,11,1,1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,1,1,1,1,1,1,1,1,1,,11,1,1,1,1,1,1,,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

  return (<div
    onMouseDown={() => context.mouseLeftClick = true}
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
    if(props.context.mouseLeftClick) {
      onMouseDown();
    }
  };

  const onMouseUp = () => {
    setDoubleClickTracker(doubleClickTracker + 1);
    if (doubleClickTracker == 2) {
      setColor('gray');
      setBackgroundColor('gray');
      setDoubleClickTracker(0);
    }
  };

  return (
    <div
      style={{ height: 30, width: 30, display: "inline-flex", border: color + " solid 2px", backgroundColor: backgroundColor }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}>
    </div>);
}