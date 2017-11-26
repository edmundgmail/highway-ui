import { Component, OnInit } from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SimpleHighway} from "../models/highway";
import {SelectObject} from "app/models/select-object";
import {RoadFeatureDetail, RoadFeatureDetailAdmin, RoadFeatureDetailNonAdmin} from "../models/road-feature-detail";

@Component({
  selector: 'app-edit-road-features',
  templateUrl: './edit-road-features.component.html',
  styleUrls: ['./edit-road-features.component.css']
})
export class EditRoadFeaturesComponent implements OnInit {
  formRoadFeture: FormGroup;
  myCurbAndGutters;
  myBarriars;
  myGuardrails;
  myShoulders;
  myDivisions;
  myCogs;
  myCounties;
  myEngineeringDistricts;
  myLegislatureDistricts;
  myNAAQSAreas;
  myNationalForests;
  myUrbanAreas;
  myCityOrTowns;
  myTruckRoutes;
  myNHSs;
  myFunctionalClasss;
  myBureauOfLands;
  myPrivateLands;
  myParks;
  myWideningPotentials;
  myWideningObstacles;
  myCurves;
  myGrades;
  myTerrains;
  myClimateZones;
  mySurfaceTypes;
  mySoilTypes;
  myTypeOfSignals;
  myNoPassingZones;
  currentHighway: SimpleHighway;
  currentDir: string;
  sides: SelectObject[];
  myMedianTypes;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService) {
    this.buildForm();
    this.sides = [{value: 'left', viewValue:'Left or Carndial'} , { value: 'right', viewValue:'Right or Non-Cardinal'}];
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDir = value);
    this.highwayService.getAttribute(4,2).subscribe(res=>this.myFunctionalClasss = res);
    this.highwayService.getAttribute(6,7).subscribe(res=>this.myWideningObstacles = res);
    this.highwayService.getAttribute(6,1).subscribe(res=>this.myCurves = res);
    this.highwayService.getAttribute(6,2).subscribe(res=>this.myGrades = res);
    this.highwayService.getAttribute(6,6).subscribe(res=>this.myTerrains = res);
    this.highwayService.getAttribute(4,1).subscribe(res=>this.myClimateZones = res);
    this.highwayService.getAttribute(7,6).subscribe(res=>this.mySurfaceTypes = res);
    this.highwayService.getAttribute(7,5).subscribe(res=>this.mySoilTypes = res);
    this.highwayService.getAttribute(6,5).subscribe(res=>this.myShoulders = res);
    this.highwayService.getAttribute(6,3).subscribe(res=>this.myMedianTypes = res);
  }


  private onSegmentTableChange($event) {
    console.log($event);
  }

  private buildForm() {
    this.formRoadFeture = this.formBuilder.group({
        COG: this.formBuilder.control(''),
        County: this.formBuilder.control(''),
        EngineeringDistrict: this.formBuilder.control(''),
        IndianReservation: this.formBuilder.control(''),
        LegislatureDistrict: this.formBuilder.control(''),
        NAAQSArea: this.formBuilder.control(''),
        NationalForest: this.formBuilder.control(''),
        UrbanArea: this.formBuilder.control(''),
        CityOrTown: this.formBuilder.control(''),
        FunctionalClass: this.formBuilder.control(null),
        NHS: this.formBuilder.control(''),
        TruckRoute: this.formBuilder.control(''),
        Park: this.formBuilder.control(''),
        PrivateLand: this.formBuilder.control(''),
        BureauOfLand: this.formBuilder.control(''),
        WideningPotential: this.formBuilder.control(''),
        WideningObstacle: this.formBuilder.control(null),
        Curve: this.formBuilder.control(null),
        Grade: this.formBuilder.control(null),
        Terrain: this.formBuilder.control(null),
        ClimateZone: this.formBuilder.control(null),
        SpeedLimit: this.formBuilder.control(0.0),
        NoPassingZone: this.formBuilder.control(''),
        TypeOfSignal: this.formBuilder.control(''),
        PercentOfGreenTime: this.formBuilder.control(0),
        PercentOfPassSight: this.formBuilder.control(0),
        SurfaceType: this.formBuilder.control(null),
        SoilType: this.formBuilder.control(null),
        CurbAndGutter: this.formBuilder.control(''),
        CurbAndGutterToggle: this.formBuilder.control(null),
        Barriar: this.formBuilder.control(''),
        BarriarToggle: this.formBuilder.control(null),
        Guardrail: this.formBuilder.control(''),
        GuardrailToggle: this.formBuilder.control(null),
        Shoulder: this.formBuilder.control(null),
        ShoulderToggle: this.formBuilder.control(null),
        Division: this.formBuilder.control(''),
        MedianType: this.formBuilder.control(null),
        MedianWidth: this.formBuilder.control(0)

      },
      {
        validator: Validators.required
      });
  }

  private isDirBoth() {
    return this.currentDir === 'B';
  }

  ngOnInit() {
    console.log("hello")
  }

  onSubmitForm() {

    const detail = new RoadFeatureDetail();
    detail.admin = new RoadFeatureDetailAdmin();
    detail.nonAdmin = new RoadFeatureDetailNonAdmin();
    detail.admin.functionalClass = this.formRoadFeture.get('FunctionalClass').value;
    detail.admin.COG = this.formRoadFeture.get('COG').value;
    detail.admin.county = this.formRoadFeture.get('County').value;
    detail.admin.engineeringDistrict = this.formRoadFeture.get('EngineeringDistrict').value;
    detail.admin.indianReservation = this.formRoadFeture.get('IndianReservation').value;
    detail.admin.legislatureDistrict = this.formRoadFeture.get('LegislatureDistrict').value;
    detail.admin.naaqsArea = this.formRoadFeture.get('NAAQSArea').value;
    detail.admin.nationalForest = this.formRoadFeture.get('NationalForest').value;
    detail.admin.urbanArea = this.formRoadFeture.get('UrbanArea').value;
    detail.admin.cityOrTown = this.formRoadFeture.get('CityOrTown').value;
    detail.admin.nhs = this.formRoadFeture.get('NHS').value;
    detail.admin.truckRoute = this.formRoadFeture.get('TruckRoute').value;
    detail.admin.park = this.formRoadFeture.get('Park').value;
    detail.admin.privateLand = this.formRoadFeture.get('PrivateLand').value;
    detail.admin.bureauOfLand = this.formRoadFeture.get('BureauOfLand').value;
    detail.admin.speedLimit = this.formRoadFeture.get('SpeedLimit').value * 1.0;
    detail.admin.noPassingZone = this.formRoadFeture.get('NoPassingZone').value;
    detail.admin.typeOfSignal = this.formRoadFeture.get('TypeOfSignal').value;

    detail.nonAdmin.wideningObstacle = this.formRoadFeture.get('WideningObstacle').value;
    detail.nonAdmin.curve = this.formRoadFeture.get('Curve').value;
    detail.nonAdmin.grade = this.formRoadFeture.get('Grade').value;
    detail.nonAdmin.terrain = this.formRoadFeture.get('Terrain').value;
    detail.nonAdmin.climateZone = this.formRoadFeture.get('ClimateZone').value;
    detail.nonAdmin.surfaceType = this.formRoadFeture.get('SurfaceType').value;
    detail.nonAdmin.soilType = this.formRoadFeture.get('SoilType').value;
    detail.nonAdmin.shoulder = this.formRoadFeture.get('Shoulder').value;
    detail.nonAdmin.shoulderToggle = this.formRoadFeture.get('ShoulderToggle').value;
    detail.nonAdmin.medianType = this.formRoadFeture.get('MedianType').value;
    detail.nonAdmin.wideningPotential = this.formRoadFeture.get('WideningPotential').value;
    detail.nonAdmin.percentOfGreenTime = this.formRoadFeture.get('PercentOfGreenTime').value;
    detail.nonAdmin.percentOfPassSight = this.formRoadFeture.get('PercentOfPassSight').value;
    detail.nonAdmin.curbAndGutter = this.formRoadFeture.get('CurbAndGutter').value;
    detail.nonAdmin.curbAndGutterToggle = this.formRoadFeture.get('CurbAndGutterToggle').value;
    detail.nonAdmin.barriar = this.formRoadFeture.get('Barriar').value;
    detail.nonAdmin.barriarToggle = this.formRoadFeture.get('BarriarToggle').value;
    detail.nonAdmin.guardrail = this.formRoadFeture.get('Guardrail').value;
    detail.nonAdmin.guardrailToggle = this.formRoadFeture.get('GuardrailToggle').value;
    detail.nonAdmin.division = this.formRoadFeture.get('Division').value;

    console.log(JSON.stringify(detail));
  }
}
