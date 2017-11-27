export class RP {
  name: string;
  rpId: number;
};

export class SegmentPoint {
  name: string;
  rpName: string;
  referencePoint: number;
  offset: number;
  connect: boolean;

  constructor(name: string, referencePoint: number, rpName: string, offset: number, connect?: boolean)
  {
    this.name = name;
    this.referencePoint = referencePoint;
    this.rpName = rpName;
    this.offset = offset;
    this.connect = connect || false;
  }
}
