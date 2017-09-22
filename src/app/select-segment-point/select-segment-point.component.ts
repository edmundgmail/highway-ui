import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select-segment-point',
  templateUrl: './select-segment-point.component.html',
  styleUrls: ['./select-segment-point.component.css']
})
export class SelectSegmentPointComponent implements OnInit {
  rpCtrl;
  offsetCtrl;
  offset;
  rp;
  rps;
  constructor(highwayService: HighwayService) {
    this.rpCtrl = new FormControl();
    this.offsetCtrl = new FormControl();
    this.rp = {};
    this.offset = 0.0;
    this.rps = [{"name":"rp1", "id":1}, {"name":"rp2", "id":2}];
  }

  @Output() uponChange = new EventEmitter();

  private onOffsetChange($event){
    this.offset = $event.target.value;
    this.uponChange.emit({
      value: (this.rp, this.offset)
    });
  }

  private onRPChange($event, rp){
    this.rp = rp;
    this.uponChange.emit({
      value: (this.rp, this.offset)
    });
  }


  ngOnInit() {
  }

}
