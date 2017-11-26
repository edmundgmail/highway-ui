import {RoadAttributeCode} from "./road-attribute";

export class RoadFeatureDetailAdmin{
  functionalClass: RoadAttributeCode;
  COG: string;
  county: string;
  engineeringDistrict: string;
  indianReservation: string;
  legislatureDistrict: string;
  naaqsArea: string;
  nationalForest: string;
  urbanArea: string;
  cityOrTown: string;
  nhs: string;
  truckRoute: string;
  park: string;
  privateLand: string;
  bureauOfLand: string;
  speedLimit: number;
  noPassingZone: string;
  typeOfSignal: string;

}

export class RoadFeatureDetailNonAdmin{
  wideningObstacle: RoadAttributeCode;
  curve: RoadAttributeCode;
  grade: RoadAttributeCode;
  terrain: RoadAttributeCode;
  climateZone: RoadAttributeCode;
  surfaceType: RoadAttributeCode;
  soilType: RoadAttributeCode;
  shoulder: RoadAttributeCode;
  shoulderToggle: boolean;
  medianType: RoadAttributeCode;
  wideningPotential: string;
  percentOfGreenTime: number;
  percentOfPassSight: number;
  curbAndGutter: string;
  curbAndGutterToggle: boolean;
  barriar: string;
  barriarToggle: boolean;
  guardrail: string;
  guardrailToggle: boolean;
  division: string;
}

export class RoadFeatureDetail {
  admin: RoadFeatureDetailAdmin;
  nonAdmin: RoadFeatureDetailNonAdmin;
}
