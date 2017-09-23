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
  highway;
  dirs;
  highwayForm: FormGroup;
  start;
  end;

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
    this.title = 'Add Segment';
    this.highway = '';
    this.dirs = highwayService.getDirs();
    this.buildForm();
  }

  private buildForm() {
    this.highwayForm = this.formBuilder.group({
        direction: this.formBuilder.control(null)
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
  }

  ngOnInit() {
  }


}
