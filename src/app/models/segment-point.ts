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
  x: number;
  y: number;
  z: number;

  constructor(name: string, referencePoint: number, rpName: string, offset: number, connect?: boolean, x?: number, y?: number, z?: number)
  {
    this.name = name;
    this.referencePoint = referencePoint;
    this.rpName = rpName;
    this.offset = offset;
    this.connect = connect || false;
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
}

