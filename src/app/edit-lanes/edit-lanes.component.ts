import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {LaneElement} from "../models/lane-element";
import {isNewline} from "codelyzer/angular/styles/cssLexer";

@Component({
  selector: 'app-edit-lanes',
  templateUrl: './edit-lanes.component.html',
  styleUrls: ['./edit-lanes.component.css']
})
export class EditLanesComponent implements OnInit {
  newLanes: LaneElement[];

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
  }

  ngOnInit() {
  }

  private uponSelectSegmentTableChange($event) {
    this.newLanes = $event;
  }

  onSubmitForm() {
    console.log('new Lanes=' + JSON.stringify(this.newLanes));
  }
}
