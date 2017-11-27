import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddSegmentRecord} from '../models/data-record';
import {HighwayService} from "../services/highway.service";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Project} from "../models/project";
import {SegmentPoint} from "../models/segment-point";
import {Http, RequestOptions,Headers} from "@angular/http";
import {isNullOrUndefined} from "util";


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
  httpresult;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
    this.editDate = new FormControl();
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDir = value);
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
    console.log("project=" + this.project);

    let record = new AddSegmentRecord();
    record.roadId = this.currentHighway.roadId;
    record.action = 'AddSegmentRecord';
    record.dateTime = this.editDate.value;
    record.dir = this.currentDir;
    if(isNullOrUndefined(this.start)){
      record.afterRP = '';
      record.leftConnect = false;
    }
    else {
      record.afterRP = this.start.rpName;
      record.leftConnect = this.start.connect;
    }

    if(isNullOrUndefined(this.end)){
      record.beforeRP = '';
      record.rightConnect = false;
    }
    else {
      record.beforeRP = this.end.rpName;
      record.rightConnect = this.end.connect;
    }


    record.segment = this.newseg;

    this.postNewSegment(record);

  }

  postNewSegment(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post(this.highwayService.baseUrl+'highway', body, options)
      .subscribe(
        data => {this.httpresult='success'; console.log("succeeded")},
        (err: Response) => {
          console.log(`Backend returned code ${err.status}, body was: ${err.text()}`);
          err.text().then(res=>this.httpresult = res);
        }
      );
  }

  ngOnInit() {
  }


}
