import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {HighwayPostService} from "../services/highway-post-service";
import {AddRoadRecord, DirectionRecord} from "../models/highway";
import {UtilsService} from "../services/utils-service";



@Component({
  selector: 'app-add-new-highway',
  templateUrl: './add-new-highway.component.html',
  styleUrls: ['./add-new-highway.component.css']
})

export class AddNewHighwayComponent implements OnInit {
  newRoadForm: FormGroup;
  roadNameControl;
  dirs;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private  highwayPostService: HighwayPostService, private utilsService: UtilsService) {
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

    let record = new AddRoadRecord();
    record.action = 'AddRoadRecord';
    record.dateTime = this.newRoadForm.get("editDate").value;
    record.roadName = this.newRoadForm.get("roadName").value;
    record.roadId= this.utilsService.murmurHash(record.roadName);

    record.jurisdictionType = this.newRoadForm.get("jurisdictionType").value;

    record.mainDir = this.newRoadForm.get("cardinalDirection").value;

    let dir1 = new DirectionRecord();
    dir1.dir = this.newRoadForm.get("cardinalDirection").value;

    let dir2 = new DirectionRecord();
    dir2.dir = this.newRoadForm.get("nonCardinalDirection").value;

    record.directions.push(dir1);
    record.directions.push(dir2);

    this.highwayPostService.postHighway(record);
  }



  ngOnInit() {
  }


}
