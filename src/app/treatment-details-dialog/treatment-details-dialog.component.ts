import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-treatment-details-dialog',
  templateUrl: './treatment-details-dialog.component.html',
  styleUrls: ['./treatment-details-dialog.component.css']
})
export class TreatmentDetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<TreatmentDetailsDialogComponent>) { }

  ngOnInit() {
  }

}
