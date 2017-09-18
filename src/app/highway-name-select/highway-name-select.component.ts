import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Highway} from "../models/highway";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-highway-name-select',
  templateUrl: './highway-name-select.component.html',
  styleUrls: ['./highway-name-select.component.css']
})
export class HighwayNameSelectComponent implements OnInit {
  highwayCtrl;

  reactiveHighways: any;
  highways: Highway[] = [
    {'id': 401, 'name' : 'Highway of Hero'},
    {'id': 400, 'name' : 'Barrie Highway'},
    {'id': 404, 'name' : 'Queen Elizabeth Way'}];

  constructor() {
    this.highwayCtrl = new FormControl();
    this.reactiveHighways = this.highwayCtrl.valueChanges
      .startWith(this.highwayCtrl.value)
      .map(val => this.displayFn(val))
      .map(name => this.filterStates(name));
  }

  @Output() roadNameChange = new EventEmitter();

  ngOnInit() {
  }

  private onChange(event, highway){
    this.roadNameChange.emit({
        value: highway
      })
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
