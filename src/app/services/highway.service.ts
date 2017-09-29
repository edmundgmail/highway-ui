import { Injectable } from '@angular/core';
import {SelectObject} from "../models/select-object";
import {Highway} from "../models/highway";
import {RP} from "../models/segment-point";
import {Project} from "../models/project";
import {Subject} from "rxjs/Subject";
import {isUndefined} from "util";

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

  projects = [
    {'id' : 1, 'name' : '401 project'},
    {'id' : 2, 'name' : '402 project'},
    {'id' : 3, 'name' : '403 project'}
  ];

  private currentHighway = new Subject<Highway>();
  private currentDir = new Subject<string> ();

  currentHighwaySelected$ = this.currentHighway.asObservable();
  currentDirSelected$ = this.currentDir.asObservable();

  announceHighway(highway : Highway) {
    this.currentHighway.next(highway);
  }

  announceDir(dir: string) {
    this.currentDir.next(dir);
  }

constructor() { }

  getProjects() : Project[]
  {
    return this.projects;
  }
  getDirs(): SelectObject[] {
    return this.dirs;
  }

  getHighways(): Highway[] {
    return this.highways;
  }

  getRPs(roadID: number, dir: String) : RP[] {
    return [{"name":"rp1", "id":1}, {"name":"rp2", "id":2}];
  }

  getSegmentStartRPs(roadID: number, dir:String): RP[]{
    if(isUndefined(roadID) || isUndefined(dir)) return [];
    return this.getRPs(roadID, dir);
  }

  getSegmentEndRPs(roadID: number, dir:String): RP[] {
    if(isUndefined(roadID) || isUndefined(dir)) return [];
    return this.getRPs(roadID, dir);
  }

}
