import {Component, Input, OnInit} from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormControl} from "@angular/forms";
import {Segment} from "../models/segment";
import {until} from "selenium-webdriver";
import elementIsSelected = until.elementIsSelected;

@Component({
  selector: 'app-select-direction',
  templateUrl: './select-direction.component.html',
  styleUrls: ['./select-direction.component.css']
})
export class SelectDirectionComponent implements OnInit {
  @Input('type') type : string;

  directionCtrl;
  dirs;

  ngOnInit() {
    console.log("type=" + this.type);
    this.getDirs();
  }

  constructor(private highwayService: HighwayService) {
    this.directionCtrl = new FormControl();
    this.directionCtrl.valueChanges.subscribe(value=> {this.highwayService.announceDir(value)});
  }

  private getDirs() {
    if(this.type==='both')
      this.dirs = this.highwayService.getDirs('both');
    else
      this.dirs = this.highwayService.getDirs('');
  }
}
