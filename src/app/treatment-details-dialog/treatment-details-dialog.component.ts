import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, NgModel, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {HighwayService} from "app/services/highway.service";
import {NewRPElement} from "../models/new-rpelement";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataSource} from "@angular/cdk/collections";
import {TreatmentDetail} from "../models/treatment";


@Component({
  selector: 'app-treatment-details-dialog',
  templateUrl: './treatment-details-dialog.component.html',
  styleUrls: ['./treatment-details-dialog.component.css']
})
export class TreatmentDetailsDialogComponent implements OnInit {
  exampleDatabase = new ExampleDatabase();
  dataSourceDetail = new NewSegmentDataSource(this.exampleDatabase);
  displayedColumns = ['layerNumber', 'material', 'materialDesign', 'thickness', 'checked'];
  selection = new SelectionModel<number>(true, []);
  rpForm: FormGroup;

  constructor(public dialogRef: MdDialogRef<TreatmentDetailsDialogComponent>, private formBuilder: FormBuilder, highwayService: HighwayService, @Inject(MD_DIALOG_DATA) public data: any) {
    this.buildForm();
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private buildForm() {
    this.rpForm = this.formBuilder.group({
        layerNumber: this.formBuilder.control(null),
        material: this.formBuilder.control(null),
        materialDesign: this.formBuilder.control(null),
        thickness: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  @Output() treatmentDetailTableChange = new EventEmitter();

  onSubmitTreatmentDetailForm() {
    this.exampleDatabase.addUser(new TreatmentDetail(this.rpForm.get("layerNumber").value,
      this.rpForm.get("material").value,
      this.rpForm.get("materialDesign").value,
      this.rpForm.get("thickness").value));

    this.rpForm.reset();
    this.treatmentDetailTableChange.emit(this.exampleDatabase.data);
  }

  onRemoveSelected() {
    this.exampleDatabase.removeUser(this.selection.selected);
    this.treatmentDetailTableChange.emit(this.exampleDatabase.data);
  }

  isAllSelected(): boolean {
    if (this.selection.isEmpty()) { return false; }
    return this.selection.selected.length === this.exampleDatabase.data.length;
  }

  masterToggle() {
    if (!this.dataSourceDetail) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.position));
    }
  }

}

class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<TreatmentDetail[]> = new BehaviorSubject<TreatmentDetail[]>([]);
  get data(): TreatmentDetail[] { return this.dataChange.value; }

  constructor() {
  }

  removeUser(e: number[]) {
    const copiedData = this.data.filter( d=>e.indexOf(d.position) < 0).slice();
    this.dataChange.next(copiedData);
  }

  /** Adds a new user to the database. */
  addUser(e: TreatmentDetail) {
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

  connect(): Observable<TreatmentDetail[]> {
    const displayDataChanges = [this._exampleDatabase.dataChange];
    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice();
    });
  }

  disconnect() {}
}
