import { Component, OnInit } from '@angular/core';
import {LaneElement} from "../models/lane-element";
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {PavementLayer} from "../models/pavement-layer";
import {Lane} from "../models/highway";
import {SegmentPoint} from "app/models/segment-point";
import {Treatment, TreatmentRecord} from "../models/treatment";
import {RequestOptions, Headers, Http} from "@angular/http";

@Component({
  selector: 'app-edit-pavement-layers',
  templateUrl: './edit-pavement-layers.component.html',
  styleUrls: ['./edit-pavement-layers.component.css']
})
export class EditPavementLayersComponent implements OnInit {
  lanes: PavementLayer[];
  currentHighway;
  currentDir;
  httpresult;

  constructor(private highwayService: HighwayService, private http:Http) {
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDir = value);
  }

  ngOnInit() {
  }

  onResetForm(){
    window.location.reload()
  }

  uponEditPavementLayersTableChange($event) {
    console.log("event=" + JSON.stringify($event));
    this.lanes = $event;
  }

  private toLane(n: PavementLayer) : Lane {
    const lane = new Lane();
    lane.start = new SegmentPoint(n.fromRP.name+"@"+n.fromOffset, n.fromRP.rpId, n.fromRP.name, n.fromOffset * 1.0)
    lane.end = new SegmentPoint(n.toRP.name+"@"+n.toOffset, n.toRP.rpId, n.toRP.name, n.toOffset * 1.0)
    lane.indexes = n.lanes
    return lane;
  }

  onSubmitForm() {
    const record = new TreatmentRecord();
    record.roadId = this.currentHighway.roadId;
    record.dir = this.currentDir;
    record.lanes = this.lanes.map(n=>this.toLane(n))
    record.treatments = this.lanes.map(n=>n.treatment)
    this.postTreatment(record)
  }

  postTreatment(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post(this.highwayService.baseUrl+'treatment', body, options)
      .subscribe(
        data => {console.log("succeeded"); this.onResetForm(); this.httpresult='success';},
        (err: Response) => {
          this.httpresult = `Backend returned code ${err.status}, body was: ${err.text()}`
        }
      );
  }
}
