import {RP} from "./segment-point";
export class SegmentElement {
  position: number;
  fromRP: RP;
  fromOffset: number;
  toRP: RP;
  toOffset: number;

  constructor(position: number, fromRP: RP, fromOffset: number, toRP: RP, toOffset: number) {
    this.position = position;
    this.fromRP = fromRP;
    this.fromOffset = fromOffset;
    this.toRP = toRP;
    this.toOffset = toOffset;
  }

  setPosition(position: number):  SegmentElement {
    this.position = position;
    return this;
  }
}
