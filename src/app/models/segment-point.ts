export class RP {
  name: string;
  id: number;

  constructor(name:string, id:number){
    this.name=name;
    this.id=id;
  }
};

export class SegmentPoint {
  rp: RP;
  offset: number;
  connect: boolean;

  constructor(rp: RP, offset: number, connect:boolean) {
    this.rp  = rp;
    this.offset = offset;
    this.connect=connect;
  }
}
