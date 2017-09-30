export class LaneElement {
  position: number;
  fromRP: number;
  fromOffset: number;
  toRP: number;
  toOffset: number;
  nLanes: number;
  laneWidth: number;

  constructor(position: number, fromRP: number, fromOffset: number, toRP: number, toOffset: number, nLanes: number, laneWidth: number) {
    this.position = position;
    this.fromRP = fromRP;
    this.fromOffset = fromOffset;
    this.toRP = toRP;
    this.toOffset = toOffset;
    this.nLanes = nLanes;
    this.laneWidth = laneWidth;
  }

  setPosition(position: number):  LaneElement {
    this.position = position;
    return this;
  }
}
