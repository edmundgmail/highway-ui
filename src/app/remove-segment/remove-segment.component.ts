import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http, RequestOptions,Headers} from "@angular/http";
import {SegmentPoint} from "../models/segment-point";
import {Project} from "../models/project";
import {PointRecord, RemoveSegmentRecord} from "../models/data-record";

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


  onResetForm() {
  }

  onSubmitForm() {
    console.log('startRP=' + JSON.stringify(this.start));
    console.log('endRP=' + JSON.stringify(this.end));
    console.log("project=" + this.project);
    console.log("reason=" + this.removeSegmentForm.get("reason").value);
    console.log("editDate=" + this.removeSegmentForm.get("editDate").value);

    let record = new RemoveSegmentRecord();
    record.roadId = this.currentHighway.roadId;
    record.action = 'RemoveSegmentRecord';
    record.dir = this.currentDir;
    record.startPoint = new PointRecord(this.start.rp.name, this.start.offset);
    record.endPoint = new PointRecord(this.end.rp.name, this.end.offset);

    this.postRemoveSegment(record);

  }

  postRemoveSegment(o: Object) {
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
