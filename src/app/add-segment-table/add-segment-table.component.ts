import { Component, OnInit } from '@angular/core';
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-add-segment-table',
  templateUrl: './add-segment-table.component.html',
  styleUrls: ['./add-segment-table.component.css']
})
export class AddSegmentTableComponent implements OnInit {
  dataSource = new NewSegmentDataSource();
  displayedColumns = ['startRP', 'endRP', 'distance', 'checked'];
  selection = new SelectionModel<number>(true, []);

  constructor() { }

  ngOnInit() {
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
  startRP: string;
  endRP: string;
  distance: number;
}

const data: Element[] = [
  {position: 1, startRP: 'RP1', endRP: 'RP2', distance: 1.5},
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
