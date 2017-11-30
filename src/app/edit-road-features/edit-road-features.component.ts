import { Component, OnInit } from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SimpleHighway} from "../models/highway";
import {SelectObject} from "app/models/select-object";
import {RoadFeatureDetail, RoadFeatureDetailAdmin, RoadFeatureDetailNonAdmin} from "../models/road-feature-detail";
import {isNullOrUndefined} from "util";
import {SegmentElement} from "app/models/segment-element";
import {Segment} from "../models/segment";
import {SegmentPoint} from "app/models/segment-point";
import {RoadFeature} from "../models/road-feature";
import {RequestOptions, Headers, Http} from "@angular/http";

@Component({
  selector: 'app-edit-road-features',
  templateUrl: './edit-road-features.component.html',
  styleUrls: ['./edit-road-features.component.css']
})
export class EditRoadFeaturesComponent implements OnInit {
  formRoadFeture: FormGroup;
  myCurbAndGutters;
  myBarriars;
  myIndianReservations;
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
  segments : SegmentElement[];
  httpresult;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http:Http) {
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


  onSegmentTableChange($event) {
    this.segments = $event;
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

  isDirBoth() {
    return this.currentDir === 'B';
  }

  ngOnInit() {
    console.log("hello")
  }


  toSegment(seg: SegmentElement): Segment{
    const segment = new Segment();
    const start = new SegmentPoint(seg.fromRP.name + "@" + seg.fromOffset, seg.fromRP.rpId, seg.fromRP.name, seg.fromOffset * 1.0);
    const end = new SegmentPoint(seg.toRP.name + "@" + seg.toOffset, seg.toRP.rpId, seg.toRP.name, seg.toOffset * 1.0);
    segment.start = start;
    segment.end = end;
    segment.length = 0;
    return segment;
  }

  onResetForm() {
   // window.location.reload()
  }

  onSubmitForm() {
    const segments = [];
    if(!isNullOrUndefined(this.segments)){
       this.segments.map(seg=>this.toSegment(seg)).forEach(segment=>segments.push(segment));
    }

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

    const record = new RoadFeature();
    record.roadId = this.currentHighway.roadId;
    record.dir = this.currentDir;
    record.segments = segments;
    record.detail = detail;

    console.log(JSON.stringify(record))

    this.postRoadFeature(record);

  }

  postRoadFeature(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post(this.highwayService.baseUrl+'feature', body, options)
      .subscribe(
        data => {console.log("succeeded"); this.onResetForm(); this.httpresult='success';},
        (err: Response) => {
          this.httpresult = `Backend returned code ${err.status}, body was: ${err.text()}`
        }
      );
  }
}
