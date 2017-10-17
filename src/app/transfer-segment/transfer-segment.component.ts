import { Component, OnInit } from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-transfer-segment',
  templateUrl: './transfer-segment.component.html',
  styleUrls: ['./transfer-segment.component.css']
})
export class TransferSegmentComponent implements OnInit {
  currentHighwayFrom;
  currentDirFrom;
  currentHighwayTo;
  currentDirTo;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService) {
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighwayFrom = value);
    this.highwayService.currentDirSelected$.subscribe(value => this.currentDirFrom = value);
    this.buildForm();
  }

  highwayNameChange($event){
    this.currentHighwayTo = $event;
  }

  buildForm()
  {

  }

  ngOnInit() {
  }

  onResetForm() {
  }

  onSubmitForm() {
  }


}
