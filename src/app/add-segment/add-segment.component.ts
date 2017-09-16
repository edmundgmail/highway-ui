import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Highway} from '../models/highway';
import {HighwayService} from "../services/highway.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.css']
})

export class AddSegmentComponent implements OnInit {
  title;
  dirs;
  highwayForm: FormGroup;
  highwayCtrl: FormControl;
  reactiveHighways: any;
  highways: Highway[] = [
    {'id': 401, 'name' : 'Highway of Hero'},
    {'id': 400, 'name' : 'Barrie Highway'},
    {'id': 404, 'name' : 'Queen Elizabeth Way'}
  ];

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
    this.title = 'Add Segment';
    this.dirs = highwayService.getDirs();
    this.buildForm();
    this.highwayCtrl = new FormControl();
    this.reactiveHighways = this.highwayCtrl.valueChanges
      .startWith(this.highwayCtrl.value)
      .map(val => this.displayFn(val))
      .map(name => this.filterStates(name));

  }

  private buildForm() {
    this.highwayForm = this.formBuilder.group({
        direction: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  roadSelected(v): boolean  {
    const sel = this.highways.indexOf(this.highwayCtrl.value) !== -1;
    if(sel) {

    }
    return sel;
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

  onResetForm() {
    this.highwayForm.reset();
  }

  onSubmitForm() {
    console.log(this.highwayForm.value);
  }

  ngOnInit() {
  }


}
