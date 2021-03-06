import {RP} from "./segment-point";
export class CoupletSegment{
  roadId: number;
  dir: string;
  startRpName: string;
  startOffset: number;
  endRpName: string;
  endOffset: number;
}

export class Couplet {
  coupletName: string;
  primary: CoupletSegment;
  secondary: CoupletSegment;
  coupletType: string;
  medianType: string;
  medianWidth: number;
  divisionType: string;
  dateTime : string;
}
