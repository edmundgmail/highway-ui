import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormControl} from "@angular/forms";
import {RP, SegmentPoint} from "../models/segment-point";

@Component({
  selector: 'app-select-segment-point',
  templateUrl: './select-segment-point.component.html',
  styleUrls: ['./select-segment-point.component.css']
})

export class SelectSegmentPointComponent implements OnInit {
  rpCtrl;
  offsetCtrl;
  connectCtrl;
  offset;
  rp;
  connect;
  rps;
  constructor(highwayService: HighwayService) {
    this.rpCtrl = new FormControl();
    this.offsetCtrl = new FormControl();
    this.connectCtrl = new FormControl();

    this.offsetCtrl.valueChanges.subscribe(value=>this.onOffsetChange(value));
    this.rpCtrl.valueChanges.subscribe(value=>this.onRPChange(value));
    this.connectCtrl.valueChanges.subscribe(value=>this.onConnectChange(value));
    this.rp = null;
    this.offset = 0.0;
    this.connect=false;
    this.rps = [{"name":"rp1", "id":1}, {"name":"rp2", "id":2}];
  }

  @Input()  type;
  @Output() uponChange = new EventEmitter();


  private emitChange(){
    this.uponChange.emit(new SegmentPoint(this.rp, this.offset, this.connect));
  }

  private onConnectChange(value) {
    this.connect = value;
    this.emitChange();
  }

  private onOffsetChange(value){
    this.offset = value;
    this.emitChange();
  }

  private onRPChange(value) {
    this.rp = value;
    this.emitChange();
  }


  ngOnInit() {
  }

}
