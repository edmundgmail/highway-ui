import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {LaneElement} from "../models/lane-element";
import {isNewline} from "codelyzer/angular/styles/cssLexer";
import {UpdateLaneRecord} from "../models/data-record";

@Component({
  selector: 'app-edit-lanes',
  templateUrl: './edit-lanes.component.html',
  styleUrls: ['./edit-lanes.component.css']
})
export class EditLanesComponent implements OnInit {
  newLanes: LaneElement[];
  currentHighway;
  currentDir;
  editDate;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService) {
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
    lane.dateTime = this.editDate.value();
    //lane.lane = this.newLanes;


  }
}
