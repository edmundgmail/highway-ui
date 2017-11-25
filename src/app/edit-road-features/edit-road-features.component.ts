import { Component, OnInit } from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SimpleHighway} from "../models/highway";
import {SelectObject} from "app/models/select-object";

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
  myCountries;
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


  private buildForm() {
    this.formRoadFeture = this.formBuilder.group({
        COG: this.formBuilder.control(null),
        County: this.formBuilder.control(null),
        EngineeringDistrict: this.formBuilder.control(null),
        IndianReservation: this.formBuilder.control(null),
        LegislatureDistrict: this.formBuilder.control(null),
        NAAQSArea: this.formBuilder.control(null),
        NationalForest: this.formBuilder.control(null),
        UrbanArea: this.formBuilder.control(null),
        CityOrTown: this.formBuilder.control(null),
        FunctionalClass: this.formBuilder.control(null),
        NHS: this.formBuilder.control(null),
        TruckRoute: this.formBuilder.control(null),
        Park: this.formBuilder.control(null),
        PrivateLand: this.formBuilder.control(null),
        BureauOfLand: this.formBuilder.control(null),
        WideningPotential: this.formBuilder.control(null),
        WideningObstacle: this.formBuilder.control(null),
        Curve: this.formBuilder.control(null),
        Grade: this.formBuilder.control(null),
        Terrain: this.formBuilder.control(null),
        ClimateZone: this.formBuilder.control(null),
        SpeedLimit: this.formBuilder.control(null),
        NoPassingZone: this.formBuilder.control(null),
        TypeOfSignal: this.formBuilder.control(null),
        PercentOfGreenTime: this.formBuilder.control(null),
        PercentOfPassSight: this.formBuilder.control(null),
        SurfaceType: this.formBuilder.control(null),
        SoilType: this.formBuilder.control(null),
        CurbAndGutter: this.formBuilder.control(null),
        Barriar: this.formBuilder.control(null),
        Guardrail: this.formBuilder.control(null),
        Shoulder: this.formBuilder.control(null),
        sideShoulder: this.formBuilder.control(null),
        Division: this.formBuilder.control(null),
        MedianType: this.formBuilder.control(null),
        MedianWidth: this.formBuilder.control(null)

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
    console.log(this.currentHighway);
    console.log(this.currentDir);
    console.log(this.formRoadFeture.get("SoilType").value);
  }
}
