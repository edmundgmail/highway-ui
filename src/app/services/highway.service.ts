import { Injectable } from '@angular/core';
import {SelectObject} from "../models/select-object";
import {Highway} from "../models/highway";

@Injectable()
export class HighwayService {
  dirs = [
  {value: 'E', viewValue: 'East'},
  {value: 'W', viewValue: 'West'},
  {value: 'S', viewValue: 'South'},
  {value: 'N', viewValue: 'North'}
  ];

  highways = [
    {'id': 401, 'name' : 'Highway of Hero'},
    {'id': 400, 'name' : 'Barrie Highway'},
    {'id': 404, 'name' : 'Queen Elizabeth Way'}];

constructor() { }
  getDirs(): SelectObject[] {
    return this.dirs;
  }

  getHighways(): Highway[] {
    return this.highways;
  }
}
