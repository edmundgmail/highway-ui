import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Highway} from "../models/highway";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {LaneElement} from "../models/lane-element";
import {RP} from "../models/segment-point";

@Component({
  selector: 'app-select-segment-table',
  templateUrl: './select-segment-table.component.html',
  styleUrls: ['./select-segment-table.component.css']
})
export class SelectSegmentTableComponent implements OnInit {
  exampleDatabase = new ExampleDatabase();
  dataSource = new NewSegmentDataSource(this.exampleDatabase);
  displayedColumns = ['fromRP', 'fromOffset', 'toRP', 'toOffset', "nLanes", "laneWidth",'checked'];
  selection = new SelectionModel<number>(true, []);
  rpForm: FormGroup;
  rps: RP[];
  currentHighway : Highway;
  currentDir: string;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService) {
    this.buildForm();
    this.highwayService.currentHighwaySelected$.subscribe(value=> {this.currentHighway = value; this.rps = this.highwayService.getRPs(this.currentHighway.id, this.currentDir);});
    this.highwayService.currentDirSelected$.subscribe(value=> { this.currentDir= value; this.rps = this.highwayService.getRPs(this.currentHighway.id, this.currentDir);});
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
        laneWidth: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  @Output() selectSegmentTableChange = new EventEmitter();

  onSubmitRPForm() {
    this.exampleDatabase.addUser(new LaneElement(0, this.rpForm.get("fromRP").value, this.rpForm.get("fromOffset").value, this.rpForm.get("toRP").value
      ,this.rpForm.get("toOffset").value, this.rpForm.get("nLanes").value, this.rpForm.get("laneWidth").value))
    ;
    this.rpForm.reset();
    this.selectSegmentTableChange.emit(this.exampleDatabase.data);
  }

  onRemoveSelected() {
    this.exampleDatabase.removeUser(this.selection.selected);
    this.selectSegmentTableChange.emit(this.exampleDatabase.data);
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

class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<LaneElement[]> = new BehaviorSubject<LaneElement[]>([]);
  get data(): LaneElement[] { return this.dataChange.value; }

  constructor() {
  }

  removeUser(e: number[]) {
    const copiedData = this.data.filter( d=>e.indexOf(d.position) < 0).slice();
    this.dataChange.next(copiedData);
  }

  /** Adds a new user to the database. */
  addUser(e: LaneElement) {
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

  connect(): Observable<LaneElement[]> {
    const displayDataChanges = [this._exampleDatabase.dataChange];
    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice();
    });
  }

  disconnect() {}
}
