import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {HighwayPostService} from "../services/highway-post-service";


@Component({
  selector: 'app-add-new-highway',
  templateUrl: './add-new-highway.component.html',
  styleUrls: ['./add-new-highway.component.css']
})

export class AddNewHighwayComponent implements OnInit {
  newRoadForm: FormGroup;
  roadNameControl;
  dirs;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private  highwayPostService: HighwayPostService) {
    this.dirs = highwayService.getDirs('no-both');
    this.buildForm();
  }

  private buildForm() {
    this.newRoadForm = this.formBuilder.group({
        roadName: this.formBuilder.control(null, [Validators.required, Validators.minLength(20)]),
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
        editDate: this.formBuilder.control(null),
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
    this.highwayPostService.postHighway(this.newRoadForm.value);
  }



  ngOnInit() {
  }


}
