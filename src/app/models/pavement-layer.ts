import {RP} from "./segment-point";
import {Treatment} from "./treatment";
export class PavementLayer {
  position: number;
  fromRP: RP;
  fromOffset: number;
  toRP: RP;
  toOffset: number;
  lanes: number[];
  treatment: Treatment;

  constructor(position: number, fromRP: RP, fromOffset: number, toRP: RP, toOffset: number, lanes: number[], treatment: Treatment) {
    this.position = position;
    this.fromRP = fromRP;
    this.fromOffset = fromOffset;
    this.toRP = toRP;
    this.toOffset = toOffset;
    this.lanes = lanes;
    this.treatment = treatment;
  }

  setPosition(position: number): PavementLayer {
    this.position = position;
    return this;
  }
}
