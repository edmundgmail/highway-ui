import {RP} from "./segment-point";
export class CoupletPoint{
  roadId: number;
  dir: string;
  rp: RP;
  offset: number;
}

export class Couplet {
  from: CoupletPoint;
  to: CoupletPoint;
  coupletTpye: string;
  medianType: string;
  medianWidth: number;
  divisionType: string;
  dateTime : string;
}
