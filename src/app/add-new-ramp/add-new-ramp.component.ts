import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http} from "@angular/http";
import {Ramp, RampPoint} from "../models/ramp";

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
  pavementTypes = [];
  metereds = [];


  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
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

  fromHighwayNameChange(event){
    this.currentHighwayFrom = event;
  }

  toHighwayNameChange(event){
    this.currentHighwayTo = event;
  }

  fromDirChange(event){
    this.currentDirFrom = event;
  }
  toDirChange(event){
    this.currentDirTo = event;
  }



  ngOnInit() {
  }

  onResetForm() {
  }

  onSubmitForm() {
    let ramp = new Ramp();
    let start = new RampPoint();
    let end = new RampPoint();
    start.name = this.addNewRampForm.get("fromPointName").value();
    start.pointType = this.addNewRampForm.get("fromPointType").value();
    start.x = this.addNewRampForm.get("fromX").value();
    start.y = this.addNewRampForm.get("fromY").value();
    start.z = this.addNewRampForm.get("fromZ").value();

    if(start.pointType === 'SystemRoad'){
      start.name = this.addNewRampForm.get("fromPointName").value();
      start.roadId = this.addNewRampForm.get("fromRoadId").value();
      start.dir = this.currentDirFrom;
      start.offset = this.addNewRampForm.get("fromOffsetCtrl").value();
      start.rp = this.addNewRampForm.get("fromRpCtrl").value();
    }

    end.name = this.addNewRampForm.get("toPointName").value();
    end.pointType = this.addNewRampForm.get("toPointType").value();
    end.x = this.addNewRampForm.get("toX").value();
    end.y = this.addNewRampForm.get("toY").value();
    end.z = this.addNewRampForm.get("toZ").value();

    if(end.pointType === 'SystemRoad'){
      end.name = this.addNewRampForm.get("toPointName").value();
      end.roadId = this.addNewRampForm.get("toRoadId").value();
      end.dir = this.currentDirTo;
      end.offset = this.addNewRampForm.get("toOffsetCtrl").value();
      end.rp = this.addNewRampForm.get("toRpCtrl").value();
    }

    ramp.fromPoint= start;
    ramp.toPoint = end;
    ramp.rampName = this.addNewRampForm.get("rampName").value();
    ramp.length = this.addNewRampForm.get("length").value();
    ramp.pavementType = this.addNewRampForm.get("pavementType").value();
    ramp.metered = this.addNewRampForm.get("metered").value();

    console.log( JSON.stringify(ramp));
  }
}
