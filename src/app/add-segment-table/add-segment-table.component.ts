import { Component, OnInit } from '@angular/core';
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "app/services/highway.service";
import {NewRPElement} from "../models/new-rpelement";
import {forEach} from "@angular/router/src/utils/collection";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-add-segment-table',
  templateUrl: './add-segment-table.component.html',
  styleUrls: ['./add-segment-table.component.css']
})
export class AddSegmentTableComponent implements OnInit {
  dataSource = new NewSegmentDataSource();
  displayedColumns = ['startNewRP', 'endNewRP', 'distance', 'checked'];
  selection = new SelectionModel<number>(true, []);
  rpForm: FormGroup;
  rps;

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
    this.rps = highwayService.getRPs(null);
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.rpForm = this.formBuilder.group({
        startNewRP: this.formBuilder.control(null),
        endNewRP: this.formBuilder.control(null),
        Distance: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  onSubmitRPForm() {
    this.dataSource.addData(new NewRPElement(0, this.rpForm.get("startNewRP").value, this.rpForm.get("endNewRP").value, this.rpForm.get("Distance").value));
  }

  onRemoveSelected() {
    this.selection.selected.forEach( e => this.dataSource.removePosition(e));
  }

  isAllSelected(): boolean {
    if (this.selection.isEmpty()) { return false; }
    return this.selection.selected.length === this.dataSource.getDataLength();
  }

  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.getData().forEach(data => this.selection.select(data.position));
    }
  }

}

export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<NewRPElement[]> = new BehaviorSubject<NewRPElement[]>([]);
  get data(): NewRPElement[] { return this.dataChange.value; }

  constructor() {
  }

  /** Adds a new user to the database. */
  addUser(e: NewRPElement) {
    const copiedData = this.data.slice();
    copiedData.push(e.setPosition(copiedData.length));
    this.dataChange.next(copiedData);
  }
}


export class NewSegmentDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  private data: NewRPElement[] = [];

  connect(): Observable<NewRPElement[]> {

    return Observable.of(this.data);

  }

  disconnect() {}

  getDataLength() {
    return this.data.length;
  }

  getData() {
    return this.data;
  }

  addData(e: NewRPElement) {
    this.data.push(e.setPosition(this.data.length));
    this.data=this.data.slice();

  }

  removePosition(position: number) {
    this.data = this.data.filter(e => e.position === position);
  }
}
