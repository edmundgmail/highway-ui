export class Treatment {
  treatmentName: string;
  treatmentDetails: TreatmentDetail[];

  constructor(treatmentName: string, treatmentDetails: TreatmentDetail[]) {
    this.treatmentName = treatmentName;
    this.treatmentDetails = treatmentDetails;
  }
}

export class TreatmentDetail {
  layerNumber: number;
  material: string;
  materialDesign: string;
  thickness: number;

  constructor(layerNumber: number, material: string, materialDesign: string, thickness: number){
    this.layerNumber = layerNumber;
    this.material = material;
    this.materialDesign = materialDesign;
    this.thickness = thickness;
  }
}
