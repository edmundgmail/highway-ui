import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-add-new-ramp',
  templateUrl: './add-new-ramp.component.html',
  styleUrls: ['./add-new-ramp.component.css']
})
export class AddNewRampComponent implements OnInit {
  pointTypes = [
    {'id': 1, 'name': 'Road in system'},
    {'id': 2, 'name': 'Road not in system'},
    {'id': 3, 'name': 'Point not on any road'}
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
    let ret = this.addNewRampForm.get("fromPointType").value === 1;
    return ret;
  }

  isToOnRoad() {
    let ret = this.addNewRampForm.get("toPointType").value === 1;
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

  }
}
