import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Highway} from '../models/highway';
import {HighwayService} from "../services/highway.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Project} from "../models/project";


@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.css']
})

export class AddSegmentComponent implements OnInit {
  start;
  end;
  newseg;
  project: Project;
  currentHighway;
  currentDir;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService) {
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDir = value);
  }

  onChange = (row) => {
    console.log(row);
  }

  private onProjectChange($event) {
    this.project = $event;
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

  onResetForm() {
  }

  onSubmitForm() {
    console.log('startRP=' + JSON.stringify(this.start));
    console.log('endRP=' + JSON.stringify(this.end));
    console.log('newseg=' + this.newseg);
    console.log("project=" + this.project);
  }

  ngOnInit() {
  }


}
