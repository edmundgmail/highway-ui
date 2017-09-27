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
  highway;
  start;
  end;
  newseg;
  dirs;
  projects;
  highwayForm: FormGroup;
  rows = [];
  headers = [
  {value: 'Name', type: 'TextField', width: 200},
  {value: 'Address', type: 'TextField', width: 200},
  {value: 'Phone', type: 'TextField', width: 200},
  {value: 'Date', type: 'DatePicker', width: 200},
  {value: 'Enabled', type: 'Toggle', width: 50},
  {value: 'Last Edited By', type: 'ReadOnly', width: 100}
];

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
    this.dirs = highwayService.getDirs();
    this.projects = highwayService.getProjects();
    this.buildForm();
  }

  onChange = (row) => {
    console.log(row);
  }


  private buildForm() {
    this.highwayForm = this.formBuilder.group({
        direction: this.formBuilder.control(null),
        projectCtrl: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  onRoadNameChange($event) {
    this.highway = $event;
  }

  onSegmentPointChange($event, type) {
    if (type === 'start') {
      this.start = $event;
    }
    else if (type === 'end') {
      this.end = $event;
    }
  }

  onSegmentTableChange($event) {
    this.newseg = $event;
  }

  roadSelected(v) {
     return this.highway !== null;
  }

  onResetForm() {
    this.highwayForm.reset();
  }

  onSubmitForm() {
    console.log(this.highwayForm.value);
    console.log('highway=' + JSON.stringify(this.highway));
    console.log('startRP=' + JSON.stringify(this.start));
    console.log('endRP=' + JSON.stringify(this.end));
    console.log('newseg=' + this.newseg);
  }

  ngOnInit() {
  }


}
