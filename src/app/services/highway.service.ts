import { Injectable } from '@angular/core';
import {SelectObject} from "../models/select-object";
import {SimpleHighway} from "../models/highway";
import {RP} from "../models/segment-point";
import {Project} from "../models/project";
import {Subject} from "rxjs/Subject";
import {isNullOrUndefined, isUndefined} from "util";
import {Segment} from "../models/segment";
import {isEmpty} from "rxjs/operator/isEmpty";
import {Http, Response} from "@angular/http";

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";

@Injectable()
export class HighwayService {
  baseUrl = 'http://localhost:5000/';

  dirs = [
  {value: 'E', viewValue: 'East'},
  {value: 'W', viewValue: 'West'},
  {value: 'S', viewValue: 'South'},
  {value: 'N', viewValue: 'North'},
  {value: 'B', viewValue: 'Both'}
  ];

  highways = [
    {'id': 401, 'name' : 'Highway of Hero'},
    {'id': 400, 'name' : 'Barrie Highway'},
    {'id': 404, 'name' : 'Queen Elizabeth Way'}];

  private currentHighway = new Subject<SimpleHighway>();
  private currentDir = new Subject<string> ();

  currentHighwaySelected$ = this.currentHighway.asObservable();
  currentDirSelected$ = this.currentDir.asObservable();

  announceHighway(highway : SimpleHighway) {
    this.currentHighway.next(highway);
  }

  announceDir(dir: string) {
    this.currentDir.next(dir);
  }

  constructor(private http: Http){

  }

  getDirs(type: any): SelectObject[] {
    if(type === 'both')
      return this.dirs;
    else
      return this.dirs.slice(0,4);
  }

  getSegments(road : SimpleHighway, dir: string)  : Segment[]{
    if(isNullOrUndefined(road) || isNullOrUndefined(dir)) return [];
    return [];
  }

}
