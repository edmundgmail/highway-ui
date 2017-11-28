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
import {isNullOrUndefined} from "util";
import {SimpleHighway} from "app/models/highway";
import {RP} from "../models/segment-point";
import {Http} from "@angular/http";

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
  treatments : Treatment[] = [];
  currentHighway;
  currentDir;
  rps;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http, public dialog: MdDialog) {
    this.highwayService.currentHighwaySelected$.subscribe(value => {this.currentHighway = value; this.getRPs(this.currentHighway, this.currentDir)});
    this.highwayService.currentDirSelected$.subscribe(value => {this.currentDir = value; this.getRPs(this.currentHighway, this.currentDir)});

    this.buildForm();
  }

  getRPs(road: SimpleHighway, dir: string)  {
    if(isNullOrUndefined(road) || isNullOrUndefined(dir)) this.rps = [];
    this.http.get(this.highwayService.baseUrl +'highway/rps/'+road.roadId+"/"+dir).subscribe(res=> this.rps = res.json() as RP[]);
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
    dialogRef.afterClosed().subscribe(value=> { console.log("value=" + JSON.stringify(value));
    this.treatments.push(new Treatment(value.name, value.details)) });
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
