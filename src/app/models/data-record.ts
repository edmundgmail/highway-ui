export class AddRoadRecord {
  action: string;
  dateTime: string;
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

  directions: DirectionRecord[];

  constructor(){
    this.directions = [];
  }
}

export class DirectionRecord {
  dir: string;
  segments: string[];

  constructor(){
    this.segments = [];
  }
}

export class AddSegmentRecord{
  action: string;
  dateTime: string;
  roadId: number;
  dir: string;
  afterRP: string;
  beforeRP: string;
  segment: string;
  leftConnect: boolean;
  rightConnect: boolean;
}

export class PointRecord {
  rpName: string;
  offset: number;

  constructor(rpName:string, offset:number) {
    this.rpName =rpName;
    this.offset = offset;
  }
}

export class RemoveSegmentRecord {
  action: string;
  dateTime: string;
  roadId: number;
  dir: string;
  reason: string;
  startPoint: PointRecord;
  endPoint: PointRecord;
}

export class UpdateLaneRecord {
  action: string;
  dateTime: string;
  roadId: number;
  dir: string;
  lanes: string[];
}
