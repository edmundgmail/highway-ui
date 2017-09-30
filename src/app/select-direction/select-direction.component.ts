import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormControl} from "@angular/forms";
import {Segment} from "../models/segment";

@Component({
  selector: 'app-select-direction',
  templateUrl: './select-direction.component.html',
  styleUrls: ['./select-direction.component.css']
})
export class SelectDirectionComponent implements OnInit {
  dirs = this.highwayService.getDirs();
  directionCtrl = new FormControl();
  constructor(private highwayService: HighwayService) {
    this.directionCtrl.valueChanges.subscribe(value=> this.highwayService.announceDir(value));
  }

  ngOnInit() {
  }

}
