export class RoadAttributeCode{
  code: string;
  desc: string;
  source: string;
}

export class RoadAttribute {
  categoryName: string;
  attributeName: string;
  codes: RoadAttributeCode[];
}
