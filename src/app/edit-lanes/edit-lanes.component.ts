import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";

@Component({
  selector: 'app-edit-lanes',
  templateUrl: './edit-lanes.component.html',
  styleUrls: ['./edit-lanes.component.css']
})
export class EditLanesComponent implements OnInit {
  editLanesForm: FormGroup;

  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
    this.buildForm();
  }

  ngOnInit() {
  }
  private buildForm() {
    this.editLanesForm = this.formBuilder.group({
        projectCtrl: this.formBuilder.control(null)
      },
      {
        validator: Validators.required
      });
  }

  private onSegmentTableChange() {

  }
}
