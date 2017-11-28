import {Lane} from "./highway";

export class Treatment {
  treatmentName: string;
  treatmentDetails: TreatmentDetail[];

  constructor(treatmentName: string, treatmentDetails: TreatmentDetail[]) {
    this.treatmentName = treatmentName;
    this.treatmentDetails = treatmentDetails;
  }
}

export class TreatmentDetail {
  position: number;
  layerNumber: number;
  material: string;
  materialDesign: string;
  thickness: number;

  constructor(layerNumber: number, material: string, materialDesign: string, thickness: number){
    this.position = 0;
    this.layerNumber = layerNumber;
    this.material = material;
    this.materialDesign = materialDesign;
    this.thickness = thickness;
  }

  setPosition(position: number) : TreatmentDetail{
    this.position = position;
    return this;
  }
}

export class TreatmentRecord{
  roadId: number;
  dir: string;
  lanes: Lane[];
  treatments: Treatment[];
}
