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
  displayedColumns = ['checked', 'name', 'weight', 'symbol'];
  selection = new SelectionModel<string>(true, []);

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
      this.dataSource.getData().forEach(data => this.selection.select(data.name));
    }
  }

}


export interface Element {
  name: string;
  checked: number;
  weight: number;
  symbol: string;
}

const data: Element[] = [
  {checked: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {checked: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {checked: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {checked: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {checked: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {checked: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {checked: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {checked: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {checked: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {checked: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {checked: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {checked: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {checked: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {checked: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {checked: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {checked: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {checked: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {checked: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {checked: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {checked: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
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
