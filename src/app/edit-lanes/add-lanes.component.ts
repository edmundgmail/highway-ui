import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {LaneElement} from "../models/lane-element";
import {isNewline} from "codelyzer/angular/styles/cssLexer";
import {UpdateLaneRecord} from "../models/data-record";
import {Http, RequestOptions, Headers} from "@angular/http";

@Component({
  selector: 'app-edit-lanes',
  templateUrl: './add-lanes.component.html',
  styleUrls: ['./add-lanes.component.css']
})
export class AddLanesComponent implements OnInit {
  newLanes: LaneElement[];
  currentHighway;
  currentDir;
  editDate;
  httpresult;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
    this.editDate = new FormControl();
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDir = value);
  }

  ngOnInit() {
  }

  private uponSelectSegmentLanesTableChange($event) {
    this.newLanes = $event;
  }

  onSubmitForm() {
    let lane = new UpdateLaneRecord();
    lane.roadId = this.currentHighway.roadId;
    lane.dir = this.currentDir;
    lane.dateTime = this.editDate.value;
    lane.lanes = this.newLanes.map(r=> r.toString());
    lane.action = "UpdateLaneRecord";

    this.postUpdateLaneRecord(lane);

  }

  postUpdateLaneRecord(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://localhost:5000/highway', body, options)
      .subscribe(
        data => {this.httpresult='success'; console.log("succeeded")},
        (err: Response) => {
          console.log(`Backend returned code ${err.status}, body was: ${err.text()}`);
          err.text().then(res=>this.httpresult = res);
        }
      );
  }

}
