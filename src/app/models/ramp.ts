import {RP} from "./segment-point";

export class RampPoint{
  name: string;
  x: number;
  y: number;
  z: number;
  pointType: string;
  roadId: number;
  dir: number;
  rp: RP;
  offset: number;
}

export class Ramp {
    rampId: number;
    rampName: string;
    length: number;
    pavementType: string;
    metered: string;
    fromPoint: RampPoint;
    toPoint; RampPoint;
}
