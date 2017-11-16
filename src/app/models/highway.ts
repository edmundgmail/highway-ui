import {RP, SegmentPoint} from "./segment-point";
import {Segment} from "./segment";

export class SimpleHighway {
  roadId: number;
  roadName: string;
}

export class Direction {
  dir: string;
  segments: Segment[];
  rps: RP[];
  lanes: Lane[];
}

export class Lane{
  start: SegmentPoint;
  end: SegmentPoint;
  indexes: number[];
}

export class Highway{
  roadId: number;
  roadName: string;
  mainDir: string;
  jurisdictionType: string;
  ownerShip: string;
  prefixCode: string;
  routeNumber : string;
  modifierCode: string;
  mainlineCode: string;
  routeTypeCode: string;
  routeOfficialName: string;
  routeFullName: string;
  routeAlternateName: string;
  beginPlace: string;
  endPlace: string;
  direcitons: Direction[];
}

