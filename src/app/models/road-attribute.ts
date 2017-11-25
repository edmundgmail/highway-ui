export class RoadAttributeCode{
  categoryId: number;
  attributeId: number;
  code: string;
  desc: string;
  source: string;
}

export class RoadAttribute {
  categoryName: string;
  attributeName: string;
  codes: RoadAttributeCode[];
}
