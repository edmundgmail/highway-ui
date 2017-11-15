import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddSegmentRecord, Highway} from '../models/highway';
import {HighwayService} from "../services/highway.service";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Project} from "../models/project";
import {SegmentPoint} from "../models/segment-point";
import {Http, RequestOptions, Response} from '@angular/http';
import {Headers} from '@angular/http';

@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.css']
})

export class AddSegmentComponent implements OnInit {
  start : SegmentPoint;
  end : SegmentPoint;
  newseg;
  project: Project;
  currentHighway;
  currentDir;
  editDate: FormControl;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
    this.editDate = new FormControl();
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

    let record = new AddSegmentRecord();
    record.roadId = this.currentHighway.roadId;
    record.action = 'AddSegmentRecord';
    record.dateTime = this.editDate.value;
    record.dir = this.currentDir;
    record.afterRP = this.start.rp.name;
    record.beforeRP = this.end.rp.name;
    record.leftConnect = this.start.connect;
    record.rightConnect = this.end.connect;
    record.segment = this.newseg;

    this.postNewSegment(record);

  }

  postNewSegment(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)
    //this.http.get('http://localhost:5000/highway').forEach( res=> console.log(res));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://localhost:5000/highway', body, options).forEach(res=>console.log(res.toString()));
  }

  ngOnInit() {
  }


}
