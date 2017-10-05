import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {PavementLayer} from "../models/pavement-layer";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Treatment} from "../models/treatment";
import {MdDialog} from "@angular/material";
import {TreatmentDetailsDialogComponent} from "../treatment-details-dialog/treatment-details-dialog.component";
import {stringify} from "@angular/core/src/util";

@Component({
  selector: 'app-pavement-layer-detail-table',
  templateUrl: './pavement-layer-detail-table.component.html',
  styleUrls: ['./pavement-layer-detail-table.component.css']
})

export class PavementLayerDetailTableComponent implements OnInit {
  exampleDatabase = new ExampleDatabase();
  dataSource = new NewSegmentDataSource(this.exampleDatabase);
  displayedColumns = ['fromRP', 'fromOffset', 'toRP', 'toOffset', "nLanes", "treatment",'checked'];
  selection = new SelectionModel<number>(true, []);
  rpForm: FormGroup;
  treatments : Treatment[] = []

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService, public dialog: MdDialog) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.rpForm = this.formBuilder.group({
        fromRP: this.formBuilder.control(null),
        fromOffset: this.formBuilder.control(null),
        toRP: this.formBuilder.control(null),
        toOffset: this.formBuilder.control(null),
        nLanes: this.formBuilder.control(null),
        treatment: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  @Output() pavementLayersTableChange = new EventEmitter();

  uponTreatmentDetailTableChange($event) {
    alert("happened");
  }

  onSubmitRPForm() {
    this.exampleDatabase.addUser(new PavementLayer(0, this.rpForm.get("fromRP").value, this.rpForm.get("fromOffset").value, this.rpForm.get("toRP").value
      ,this.rpForm.get("toOffset").value, this.rpForm.get("nLanes").value, this.rpForm.get("treatment").value))
    ;
    this.rpForm.reset();
    this.pavementLayersTableChange.emit(this.exampleDatabase.data);
  }

  onRemoveSelected() {
    this.exampleDatabase.removeUser(this.selection.selected);
    this.pavementLayersTableChange.emit(this.exampleDatabase.data);
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

  openDialog() {
    let dialogRef = this.dialog.open(TreatmentDetailsDialogComponent, {data: {name: '', details: ''}});
    dialogRef.afterClosed().subscribe(value=>console.log('dialog value after, name=' + value.name + ', details=' + JSON.stringify(value.details)));
  }

}

class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<PavementLayer[]> = new BehaviorSubject<PavementLayer[]>([]);
  get data(): PavementLayer[] { return this.dataChange.value; }

  constructor() {
  }

  removeUser(e: number[]) {
    const copiedData = this.data.filter( d=>e.indexOf(d.position) < 0).slice();
    this.dataChange.next(copiedData);
  }

  /** Adds a new user to the database. */
  addUser(e: PavementLayer) {
    const copiedData = this.data.slice();
    copiedData.push(e.setPosition(copiedData.length));
    this.dataChange.next(copiedData);
  }
}


class NewSegmentDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  constructor(private _exampleDatabase: ExampleDatabase)
  {
    super();
  }

  connect(): Observable<PavementLayer[]> {
    const displayDataChanges = [this._exampleDatabase.dataChange];
    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice();
    });
  }

  disconnect() {}
}
