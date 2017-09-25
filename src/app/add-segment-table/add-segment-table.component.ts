import { Component, OnInit } from '@angular/core';
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "app/services/highway.service";

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
    this.rps=[];
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


export interface Element {
  position: number;
  startNewRP: string;
  endNewRP: string;
  distance: number;
}

const data: Element[] = [
  {position: 1, startNewRP: 'RP1', endNewRP: 'RP2', distance: 1.5},
];


export class NewSegmentDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}

  getDataLength() {
    return data.length;
  }

  getData() {
    return data;
  }
}
