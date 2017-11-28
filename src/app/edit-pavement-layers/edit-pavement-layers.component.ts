import { Component, OnInit } from '@angular/core';
import {LaneElement} from "../models/lane-element";
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {PavementLayer} from "../models/pavement-layer";

@Component({
  selector: 'app-edit-pavement-layers',
  templateUrl: './edit-pavement-layers.component.html',
  styleUrls: ['./edit-pavement-layers.component.css']
})
export class EditPavementLayersComponent implements OnInit {
  lanes: PavementLayer[];
  currentHighway;
  currentDir;

  constructor(private highwayService: HighwayService) {
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDir = value);
  }

  ngOnInit() {
  }

  private uponEditPavementLayersTableChange($event) {
    console.log("event=" + JSON.stringify($event));
    this.lanes = $event;
  }

  onSubmitForm() {
    console.log('new Lanes=' + JSON.stringify(this.lanes));
  }
}
