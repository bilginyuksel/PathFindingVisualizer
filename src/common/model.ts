type CellInterceptor = () => void
export type PathFinderAlgorithm = (cells: MazeCell[], startCell: MazeCell, endCell: MazeCell) => void

export class MazeCell {
  readonly id: number;
  readonly row: number;
  readonly col: number;
  private _color: string = 'white';
  private _marked: boolean = false;
  private _rigid: boolean = false;
  private _interceptors: CellInterceptor[] = [];

  constructor(id: number, row: number, col: number) {
    this.id = id;
    this.row = row;
    this.col = col;
  }

  addInterceptor(callback: () => void) {
    this._interceptors.push(callback);
  }

  private runInterceptors() {
    this._interceptors.forEach(func => func());
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

export class Observer {
  _callback : () => void;

  constructor() {
    this._callback = () => {};
  }
  
  register(callback: () => void) {
    this._callback = callback; 
  }

  notifyAll() {
    this._callback(); 
  }
}