import {Segment} from "./segment";
import {RoadFeatureDetail} from "./road-feature-detail";

export class RoadFeature {
  roadId: number;
  dir: string;
  segments: Segment[];
  detail: RoadFeatureDetail;
}
