import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http, RequestOptions,Headers} from "@angular/http";
import {SegmentPoint} from "../models/segment-point";
import {Project} from "../models/project";
import {PointRecord, RemoveSegmentRecord} from "../models/data-record";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-remove-segment',
  templateUrl: './remove-segment.component.html',
  styleUrls: ['./remove-segment.component.css']
})
export class RemoveSegmentComponent implements OnInit {
  start : SegmentPoint;
  end : SegmentPoint;
  project: Project;
  currentHighway;
  currentDir;
  removeSegmentForm : FormGroup;
  reasons = ["Change Jurisdiction", "Abandon", "Retire","Other"];
  httpresult='';
  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
    this.removeSegmentForm = this.formBuilder.group({
      reason: this.formBuilder.control(null),
      editDate: this.formBuilder.control(null)
    });
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDir = value);
  }

  onChange = (row) => {
    console.log(row);
  }

  onProjectChange($event) {
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


  onResetForm() {
   // window.location.reload();
  }

  onSubmitForm() {
    let record = new RemoveSegmentRecord();
    record.roadId = this.currentHighway.roadId;
    record.action = 'RemoveSegmentRecord';
    record.dir = this.currentDir;
    record.dateTime = this.removeSegmentForm.get("editDate").value;
    record.reason = this.removeSegmentForm.get("reason").value;
    record.startPoint = new PointRecord(this.start.rpName, this.start.offset);
    record.endPoint = new PointRecord(this.end.rpName, this.end.offset);

    let body = JSON.stringify(record);
    console.log(body)
    this.postRemoveSegment(record);

  }


  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  postRemoveSegment(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post(this.highwayService.baseUrl+'highway', body, options).subscribe(
      data => {console.log(data.json()); this.onResetForm(); this.httpresult='success';},
      (err: Response) => {
        this.httpresult = `Backend returned code ${err.status}, body was: ${err.text()}`
      }
    );

  }

  ngOnInit() {
  }

}
