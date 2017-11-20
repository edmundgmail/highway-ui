import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormControl} from "@angular/forms";
import {RP, SegmentPoint} from "../models/segment-point";
import {SimpleHighway} from "../models/highway";
import {Http} from "@angular/http";
import {isNullOrUndefined} from "util";

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
  currentHighway;
  currentDir: string;

  constructor(private highwayService: HighwayService, private http: Http) {
    this.rpCtrl = new FormControl();
    this.offsetCtrl = new FormControl();
    this.connectCtrl = new FormControl();

    this.offsetCtrl.valueChanges.subscribe(value => this.onOffsetChange(value));
    this.rpCtrl.valueChanges.subscribe(value => this.onRPChange(value));
    this.connectCtrl.valueChanges.subscribe(value => this.onConnectChange(value));
    this.rp = null;
    this.offset = 0.0;
    this.connect = false;

    this.highwayService.currentHighwaySelected$.subscribe(value => {console.log(value); this.currentHighway = value; this.getRps();});
    this.highwayService.currentDirSelected$.subscribe(value=>{console.log(value); this.currentDir= value; this.getRps();});
  }


  ngOnInit() {
    console.log("ngOnInit");
  }

  private getRps() {
   if(isNullOrUndefined(this.currentHighway) || isNullOrUndefined(this.currentDir))
     this.rps = [];
   else {
     if(this.datatype ==='start')
       this.http.get(this.highwayService.baseUrl + "highway/segmentendrps/"+this.currentHighway.roadId + "/" + this.currentDir).subscribe(res=> this.rps = res.json() as RP[]);
     else if(this.datatype==='end')
       this.http.get(this.highwayService.baseUrl + "highway/segmentstartrps/"+this.currentHighway.roadId + "/" + this.currentDir).subscribe(res=> this.rps = res.json() as RP[]);
     else if(this.datatype === 'all')
       this.http.get(this.highwayService.baseUrl + "highway/rps/"+this.currentHighway.roadId + "/" + this.currentDir).subscribe(res=> this.rps = res.json() as RP[]);
   }
  }

  @Input('datatype') datatype;
  @Input('type') type;

  @Output() uponChange = new EventEmitter();


  private emitChange(){
    this.uponChange.emit(new SegmentPoint(this.rp, 1.0 * this.offset, this.connect));
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


}
