import { Component, OnInit } from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select-direction',
  templateUrl: './select-direction.component.html',
  styleUrls: ['./select-direction.component.css']
})
export class SelectDirectionComponent implements OnInit {
  dirs;
  directionCtrl = new FormControl();

  constructor(private highwayService: HighwayService) {
    this.dirs = highwayService.dirs;
    this.directionCtrl.valueChanges.subscribe(value=>this.highwayService.announceDir(value));
  }

  ngOnInit() {
  }

}
