import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Highway} from '../models/highway';
import {HighwayService} from "../services/highway.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.css']
})

export class AddSegmentComponent implements OnInit {
  title;
  roadName;
  dirs;
  highwayForm: FormGroup;

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
    this.title = 'Add Segment';
    this.roadName='';
    this.dirs = highwayService.getDirs();
    this.buildForm();
  }

  private buildForm() {
    this.highwayForm = this.formBuilder.group({
        roadName: this.formBuilder.control(null),
        direction: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  onRoadNameChange($event) {
    this.roadName = $event.value;
    alert(this.roadName);
  }

  onSegmentPointChange($event) {
    alert($event.value);
  }

  roadSelected(v) {
     return !this.roadName.isEmpty;
  }

  onResetForm() {
    this.highwayForm.reset();
  }

  onSubmitForm() {
    console.log(this.highwayForm.value);
  }

  ngOnInit() {
  }


}
