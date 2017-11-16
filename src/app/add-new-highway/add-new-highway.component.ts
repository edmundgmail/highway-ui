import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {HighwayPostService} from "../services/highway-post-service";
import {AddRoadRecord, DirectionRecord} from "../models/data-record";
import {UtilsService} from "../services/utils-service";
import {logger} from "codelyzer/util/logger";
import {Http} from "@angular/http";
import {Highway, SimpleHighway} from "../models/highway";



@Component({
  selector: 'app-add-new-highway',
  templateUrl: './add-new-highway.component.html',
  styleUrls: ['./add-new-highway.component.css']
})

export class AddNewHighwayComponent implements OnInit {
  data : Highway;
  newRoadForm: FormGroup;
  dirs;
  currentHighway : SimpleHighway;

  constructor(private formBuilder: FormBuilder, private http: Http, private highwayService: HighwayService, private  highwayPostService: HighwayPostService, private utilsService: UtilsService) {
    this.highwayService.currentHighwaySelected$.subscribe(value => {console.log(value); this.currentHighway = value; this.getHighwayDetails();});
    this.dirs = highwayService.getDirs('no-both');

    this.buildForm();
  }

  private getHighwayDetails() {
      console.info("currenthighway = " + this.currentHighway);
      this.http.get(this.highwayService.baseUrl + "highway/" + this.currentHighway.roadId).subscribe(res=> {this.data = res.json() as Highway; this.loadForm();});;
  }

  private loadForm() {
    this.newRoadForm.patchValue({"jurisdictionType": this.data.jurisdictionType});
    this.newRoadForm.patchValue({"ownerShip": this.data.ownerShip});
    this.newRoadForm.patchValue({"prefixCode": this.data.prefixCode});
    this.newRoadForm.patchValue({"routeNumber": this.data.routeNumber});
    this.newRoadForm.patchValue({"modifierCode": this.data.modifierCode});
    this.newRoadForm.patchValue({"mainlineCode": this.data.mainlineCode});
    this.newRoadForm.patchValue({"routeTypeCode": this.data.routeTypeCode});
    this.newRoadForm.patchValue({"cardinalDirection": this.data.mainDir});
    this.newRoadForm.patchValue({"nonCardinalDirection": this.data.mainDir});
    this.newRoadForm.patchValue({"routeOfficialName": this.data.routeOfficialName});
    this.newRoadForm.patchValue({"routeFullName": this.data.routeFullName});
    this.newRoadForm.patchValue({"routeAlternateName": this.data.routeAlternateName});
    this.newRoadForm.patchValue({"beginPlace": this.data.beginPlace});
    this.newRoadForm.patchValue({"endPlace": this.data.endPlace});
    this.newRoadForm.patchValue({"editDate": this.data});
  }


  private buildForm() {
    this.newRoadForm = this.formBuilder.group({
        jurisdictionType: this.formBuilder.control(null),
        ownerShip: this.formBuilder.control(null),
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
  }

  onResetForm() {
    this.newRoadForm.reset();
  }

  onSubmitForm() {

    let record = new AddRoadRecord();
    record.action = 'AddRoadRecord';
    record.dateTime = this.newRoadForm.get("editDate").value;
    record.roadId= this.utilsService.murmurHash(record.roadName);
    record.jurisdictionType = this.newRoadForm.get("jurisdictionType").value;
    record.ownerShip = this.newRoadForm.get("ownerShip").value;
    record.prefixCode = this.newRoadForm.get("prefixCode").value;
    record.routeNumber = this.newRoadForm.get("routeNumber").value;
    record.modifierCode = this.newRoadForm.get("modifierCode").value;
    record.mainlineCode = this.newRoadForm.get("mainlineCode").value;
    record.routeTypeCode = this.newRoadForm.get("routeTypeCode").value;
    record.routeOfficialName = this.newRoadForm.get("routeOfficialName").value;
    record.routeFullName = this.newRoadForm.get("routeFullName").value;
    record.routeAlternateName = this.newRoadForm.get("routeAlternateName").value;
    record.beginPlace = this.newRoadForm.get("beginPlace").value;
    record.endPlace = this.newRoadForm.get("endPlace").value;

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
