import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Highway} from "../models/highway";
import {FormControl} from "@angular/forms";
import {HighwayService} from "../services/highway.service";

@Component({
  selector: 'app-highway-name-select',
  templateUrl: './highway-name-select.component.html',
  styleUrls: ['./highway-name-select.component.css']
})
export class HighwayNameSelectComponent implements OnInit {
  highwayCtrl;
  highways;
  reactiveHighways: any;
  constructor(highwayService: HighwayService) {
    this.highwayCtrl = new FormControl();
    this.highways = highwayService.getHighways();
    this.reactiveHighways = this.highwayCtrl.valueChanges
      .startWith(this.highwayCtrl.value)
      .map(val => this.displayFn(val))
      .map(name => this.filterStates(name));
  }

  @Output() roadNameChange = new EventEmitter();

  ngOnInit() {
  }

  private onChange(event, highway){
    this.roadNameChange.emit(highway);
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterStates(val: string) {
    return val ? this._filter(this.highways, val) : this.highways;
  }

  private _filter(highways: Highway[], val: string) {
    const filterValue = val.toLowerCase();
    return highways.filter(highway => highway.name.toLowerCase().startsWith(filterValue));
  }
}
