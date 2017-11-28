import {RP} from "./segment-point";
export class LaneElement {
  position: number;
  fromRP: RP;
  fromOffset: number;
  toRP: RP;
  toOffset: number;
  nLanes: number[];
  laneWidth: number;

  constructor(position: number, fromRP: RP, fromOffset: number, toRP: RP, toOffset: number, nLanes: number[], laneWidth: number) {
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

  toString() : string {
    let str= this.fromRP.name + "," + this.fromOffset + "," + this.toRP.name + "," + this.toOffset + "," + this.nLanes + ",out";
    console.log(str);
    return str;
  }
}
