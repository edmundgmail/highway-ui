export class Highway {
  roadId: number;
  roadName: string;
}

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
