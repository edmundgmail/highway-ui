import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Highway} from "../models/highway";
import {FormControl} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-highway-name-select',
  templateUrl: './highway-name-select.component.html',
  styleUrls: ['./highway-name-select.component.css']
})
export class HighwayNameSelectComponent implements OnInit {
  @Input('type') type : string;

  highwayCtrl;
  highways;
  reactiveHighways: any;
  constructor(private highwayService: HighwayService, private http: Http) {
    this.highwayCtrl = new FormControl();
    //this.http.get(this.highwayService.baseUrl +'highway').map((res) => this.extractHighway(res)).catch((res) => this.handleError(res));
    this.http.get(this.highwayService.baseUrl +'highway').subscribe((res:Response) => console.log(res.json()));
    this.reactiveHighways = this.highwayCtrl.valueChanges
      .startWith(this.highwayCtrl.value)
      .map(val => this.displayFn(val))
      .map(name => this.filterStates(name));
  }

  @Output() uponChange = new EventEmitter();

  private extractHighway(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  ngOnInit() {

  }
  private onChange(event, highway) {
    if(this.type === 'private'){
      this.uponChange.emit(highway);
    }
    else
      this.highwayService.announceHighway(highway);
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
