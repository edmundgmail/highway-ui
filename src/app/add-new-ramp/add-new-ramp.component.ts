import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http} from "@angular/http";
import {Ramp, RampPoint} from "../models/ramp";
import {SimpleHighway} from "../models/highway";
import {isNullOrUndefined} from "util";
import {RP} from "../models/segment-point";
import {UtilsService} from "../services/utils-service";

@Component({
  selector: 'app-add-new-ramp',
  templateUrl: './add-new-ramp.component.html',
  styleUrls: ['./add-new-ramp.component.css']
})
export class AddNewRampComponent implements OnInit {
  pointTypes = [
    {'value': 'SystemRoad', 'name': 'Road in system'},
    {'value': 'NonSystemRoad', 'name': 'Road not in system'},
    {'value': 'NonRoad', 'name': 'Point not on any road'}
    ];
  addNewRampForm;
  currentHighwayFrom;
  currentDirFrom;
  currentHighwayTo;
  currentDirTo;
  fromRps = [];
  toRps = [];
  pavementTypes = ['A','B'];
  metereds = ['true', 'false'];


  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http,  private utilsService: UtilsService) {
    this.addNewRampForm = this.formBuilder.group({
      fromPointType: this.formBuilder.control(null),
      fromPointName: this.formBuilder.control(null),
      fromX: this.formBuilder.control(null),
      fromY: this.formBuilder.control(null),
      fromZ: this.formBuilder.control(null),
      fromRpCtrl: this.formBuilder.control(null),
      fromOffsetCtrl: this.formBuilder.control(null),
      toPointType: this.formBuilder.control(null),
      toPointName: this.formBuilder.control(null),
      toX: this.formBuilder.control(null),
      toY: this.formBuilder.control(null),
      toZ: this.formBuilder.control(null),
      toRpCtrl: this.formBuilder.control(null),
      toOffsetCtrl: this.formBuilder.control(null),
      rampName: this.formBuilder.control(null),
      length: this.formBuilder.control(null),
      pavementType: this.formBuilder.control(null),
      metered: this.formBuilder.control(null),
      editDate: this.formBuilder.control(null)
    });
  }

  isFromOnRoad() {
    let ret = this.addNewRampForm.get("fromPointType").value === 'SystemRoad';
    return ret;
  }

  isToOnRoad() {
    let ret = this.addNewRampForm.get("toPointType").value === 'SystemRoad';
    return ret;
  }

  getFromRps(){
    this.getRPs(this.currentHighwayFrom, this.currentDirFrom, this.fromRps);
  }

  getToRps() {
    this.getRPs(this.currentHighwayTo, this.currentDirTo, this.toRps);
  }

  getRPs(road: SimpleHighway, dir: string, rps: RP[])  {
    if(isNullOrUndefined(road) || isNullOrUndefined(dir)) rps = [];
    this.http.get(this.highwayService.baseUrl +'highway/rps/'+road.roadId+"/"+dir).subscribe(res=> rps = res.json() as RP[]);
  }


  fromHighwayNameChange(event){
    this.currentHighwayFrom = event;
    this.getFromRps();
  }

  toHighwayNameChange(event){
    this.currentHighwayTo = event;
    this.getToRps();
  }

  fromDirChange(event){
    this.currentDirFrom = event;
    this.getFromRps();
  }
  toDirChange(event){
    this.currentDirTo = event;
    this.getToRps();
  }



  ngOnInit() {
  }

  onResetForm() {
  }

  onSubmitForm() {
    let ramp = new Ramp();
    let start = new RampPoint();
    let end = new RampPoint();
    start.name = this.addNewRampForm.get("fromPointName").value;
    start.pointType = this.addNewRampForm.get("fromPointType").value;
    start.x = this.addNewRampForm.get("fromX").value * 1.0;
    start.y = this.addNewRampForm.get("fromY").value * 1.0;
    start.z = this.addNewRampForm.get("fromZ").value * 1.0;

    if(start.pointType === 'SystemRoad'){
      start.name = this.addNewRampForm.get("fromPointName").value;
      start.roadId = this.currentHighwayFrom.roadId;
      start.dir = this.currentDirFrom;
      start.offset = this.addNewRampForm.get("fromOffsetCtrl").value * 1.0;
      start.rp = this.addNewRampForm.get("fromRpCtrl").value;
    }

    end.name = this.addNewRampForm.get("toPointName").value;
    end.pointType = this.addNewRampForm.get("toPointType").value;
    end.x = this.addNewRampForm.get("toX").value  * 1.0;
    end.y = this.addNewRampForm.get("toY").value  * 1.0;
    end.z = this.addNewRampForm.get("toZ").value * 1.0;

    if(end.pointType === 'SystemRoad'){
      end.name = this.addNewRampForm.get("toPointName").value;
      end.roadId = this.currentHighwayTo.roadId;
      end.dir = this.currentDirTo;
      end.offset = this.addNewRampForm.get("toOffsetCtrl").value  * 1.0;
      end.rp = this.addNewRampForm.get("toRpCtrl").value;
    }

    ramp.fromPoint= start;
    ramp.toPoint = end;
    ramp.rampName = this.addNewRampForm.get("rampName").value;
    ramp.rampId = this.utilsService.murmurHash(ramp.rampName);
    ramp.length = this.addNewRampForm.get("length").value  * 1.0;
    ramp.pavementType = this.addNewRampForm.get("pavementType").value;
    ramp.metered = this.addNewRampForm.get("metered").value;

    console.log( JSON.stringify(ramp));
  }
}
