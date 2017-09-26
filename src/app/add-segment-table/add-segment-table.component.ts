import { Component, OnInit } from '@angular/core';
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
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
  exampleDatabase = new ExampleDatabase();
  dataSource = new NewSegmentDataSource(this.exampleDatabase);
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
    this.exampleDatabase.addUser(new NewRPElement(0, this.rpForm.get("startNewRP").value, this.rpForm.get("endNewRP").value, this.rpForm.get("Distance").value));
  }

  onRemoveSelected() {
    this.exampleDatabase.removeUser(this.selection.selected);
  }

  isAllSelected(): boolean {
    if (this.selection.isEmpty()) { return false; }
    return this.selection.selected.length === this.exampleDatabase.data.length;
  }

  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.position));
    }
  }

}

export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<NewRPElement[]> = new BehaviorSubject<NewRPElement[]>([]);
  get data(): NewRPElement[] { return this.dataChange.value; }

  constructor() {
  }

  removeUser(e: number[]) {
    const copiedData = this.data.filter( d=>e.indexOf(d.position) < 0).slice();
    this.dataChange.next(copiedData);
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
  constructor(private _exampleDatabase: ExampleDatabase)
  {
   super();
  }

  connect(): Observable<NewRPElement[]> {
    const displayDataChanges = [this._exampleDatabase.dataChange];
    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice();
    });
  }

  disconnect() {}
}
