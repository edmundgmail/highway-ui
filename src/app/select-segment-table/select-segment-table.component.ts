import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Highway} from "../models/highway";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {RP} from "../models/segment-point";
import {SegmentElement} from "../models/segment-element";
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";

@Component({
  selector: 'app-select-segment-table',
  templateUrl: './select-segment-table.component.html',
  styleUrls: ['./select-segment-table.component.css']
})
export class SelectSegmentTableComponent implements OnInit {
  exampleDatabase = new ExampleDatabase();
  dataSource = new NewSegmentDataSource(this.exampleDatabase);
  displayedColumns = ['fromRP', 'fromOffset', 'toRP', 'toOffset','checked'];
  selection = new SelectionModel<number>(true, []);
  rpForm: FormGroup;
  rps: RP[];
  currentHighway : Highway;
  currentDir: string;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
    this.buildForm();
    this.highwayService.currentHighwaySelected$.subscribe(value=> {
      this.currentHighway = value;
      this.rps = this.highwayService.getRPs(this.currentHighway, this.currentDir);});
    this.highwayService.currentDirSelected$.subscribe(value=> {
      this.currentDir= value;
      console.log("currentDir = " + this.currentDir);
      this.rps = this.highwayService.getRPs(this.currentHighway, this.currentDir);});
  }

  getRPs(road: Highway, dir: string)  {
    if(isNullOrUndefined(road) || isNullOrUndefined(dir)) return [];
    this.http.get(this.highwayService.baseUrl +'highway').subscribe(res=> this.rps = res.json() as RP[]);
  }

  ngOnInit() {
  }

  private buildForm() {
    this.rpForm = this.formBuilder.group({
        fromRP: this.formBuilder.control(null),
        fromOffset: this.formBuilder.control(null),
        toRP: this.formBuilder.control(null),
        toOffset: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  @Output() selectSegmentTableChange = new EventEmitter();

  onSubmitRPForm() {
    this.exampleDatabase.addUser(new SegmentElement(0, this.rpForm.get("fromRP").value,
          this.rpForm.get("fromOffset").value,
        this.rpForm.get("toRP").value
        ,this.rpForm.get("toOffset").value));
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
  dataChange: BehaviorSubject<SegmentElement[]> = new BehaviorSubject<SegmentElement[]>([]);
  get data(): SegmentElement[] { return this.dataChange.value; }

  constructor() {
  }

  removeUser(e: number[]) {
    const copiedData = this.data.filter( d=>e.indexOf(d.position) < 0).slice();
    this.dataChange.next(copiedData);
  }

  /** Adds a new user to the database. */
  addUser(e: SegmentElement) {
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

  connect(): Observable<SegmentElement[]> {
    const displayDataChanges = [this._exampleDatabase.dataChange];
    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice();
    });
  }

  disconnect() {}
}
