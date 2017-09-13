import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-directions',
  templateUrl: './edit-directions.component.html',
  styleUrls: ['./edit-directions.component.css']
})
export class EditDirectionsComponent implements OnInit {
  newRoadForm: FormGroup;
  roadNameControl;
  title;

  constructor(private formBuilder: FormBuilder) {
    this.title = 'Edit Road and Directions';
    this.buildForm();
  }

  private buildForm() {
    this.newRoadForm = this.formBuilder.group({
        roadName: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
        jurisdictionType: this.formBuilder.control(null),
        ownership: this.formBuilder.control(null),
        prefixCode: this.formBuilder.control(null),
        routeNumber: this.formBuilder.control(null),
        modifierCode: this.formBuilder.control(null),
        mainlineCode: this.formBuilder.control(null),
        routeTypeCode: this.formBuilder.control(null),
        cardinalDirection: this.formBuilder.control(null),
        nonCardinalDirection: this.formBuilder.control(null),
        routeOfficialName: this.formBuilder.control(null),
        routeFullName: this.formBuilder.control(null),
        routeAlternateName: this.formBuilder.control(null),
        beginPlace: this.formBuilder.control(null),
        endPlace: this.formBuilder.control(null),
      },
      {
        validator: Validators.required
      });
    this.roadNameControl = this.newRoadForm.get('roadName');
  }

  onResetForm() {
    this.newRoadForm.reset();
  }

  onSubmitForm() {
    console.log(this.newRoadForm.value);
  }

  ngOnInit() {
  }

}
