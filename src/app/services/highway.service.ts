import { Injectable } from '@angular/core';
import {SelectObject} from "../models/select-object";

@Injectable()
export class HighwayService {
  dirs = [
  {value: 'E', viewValue: 'East'},
  {value: 'W', viewValue: 'West'},
  {value: 'S', viewValue: 'South'},
  {value: 'N', viewValue: 'North'}
  ];

  constructor() { }
  getDirs(): SelectObject[] {
    return this.dirs;
  }
}
