import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http, RequestOptions,Headers} from "@angular/http";
import {isNullOrUndefined} from "util";
import {SimpleHighway} from "../models/highway";
import {RP} from "../models/segment-point";
import {Couplet, CoupletSegment} from "../models/couplet";

@Component({
  selector: 'app-add-new-couplet',
  templateUrl: './add-new-couplet.component.html',
  styleUrls: ['./add-new-couplet.component.css']
})
export class AddNewCoupletComponent implements OnInit {
  addNewCoupletForm;
  primaryHighway;
  primaryDir;
  primaryRps = [];
  secondaryHighway;
  secondaryDir;
  secondaryRps=[];

  httpresult;
  coupletTypes = ['Median','Division'];
  medianTypes = ['MedianA', 'MedianB','MedianC'];
  divisionTypes = ['Division1','Division2','Divison3'];

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
    this.addNewCoupletForm = this.formBuilder.group({
      primaryFromRpCtrl: this.formBuilder.control(null),
      primaryFromOffsetCtrl: this.formBuilder.control('0.0'),
      primaryToRpCtrl: this.formBuilder.control(null),
      primaryToOffsetCtrl: this.formBuilder.control('0.0'),
      secondaryFromRpCtrl: this.formBuilder.control(null),
      secondaryFromOffsetCtrl: this.formBuilder.control('0.0'),
      secondaryToRpCtrl: this.formBuilder.control(null),
      secondaryToOffsetCtrl: this.formBuilder.control('0.0'),
      coupletName: this.formBuilder.control(null),
      coupletType: this.formBuilder.control(null),
      medianType: this.formBuilder.control(''),
      medianWidth: this.formBuilder.control('0.0'),
      divisionType: this.formBuilder.control(''),
      editDate: this.formBuilder.control(new Date())
    });
  }

  isMedian() {
    let ret = this.addNewCoupletForm.get("coupletType").value === 'Median';
    return ret;
  }

  isDivision() {
    let ret = this.addNewCoupletForm.get("coupletType").value === 'Division';
    return ret;
  }

  getPrimaryRps(){
    if(!isNullOrUndefined(this.primaryHighway) &&  !isNullOrUndefined(this.primaryDir))
      this.getRPs(this.primaryHighway, this.primaryDir).subscribe(res => { console.log(res); this.primaryRps = res;});
  }

  primaryHighwayNameChange(event){
    this.primaryHighway = event;
    this.getPrimaryRps();
  }

  primaryDirChange(event){
    this.primaryDir = event;
    this.getPrimaryRps();
  }

  getsecondaryRps(){
    if(!isNullOrUndefined(this.secondaryHighway) &&  !isNullOrUndefined(this.secondaryDir))
      this.getRPs(this.secondaryHighway, this.secondaryDir).subscribe(res => { console.log(res); this.secondaryRps = res;});
  }

  secondaryHighwayNameChange(event){
    this.secondaryHighway = event;
    this.getsecondaryRps();
  }

  secondaryDirChange(event){
    this.secondaryDir = event;
    this.getsecondaryRps();
  }


  getRPs(road: SimpleHighway, dir: string)  {
    return this.http.get(this.highwayService.baseUrl +'highway/rps/'+road.roadId+"/"+dir).map(res=> res.json() as RP[]);
  }


  ngOnInit() {
  }

  onResetForm() {
  }

  onSubmitForm() {
    let couplet = new Couplet();
    let primary = new CoupletSegment();
    let secondary  = new CoupletSegment();
    couplet.dateTime = this.addNewCoupletForm.get("editDate").value;
    couplet.coupletName = this.addNewCoupletForm.get("coupletName").value;
    couplet.coupletType = this.addNewCoupletForm.get("coupletType").value;
    couplet.medianType = this.addNewCoupletForm.get("medianType").value;
    couplet.medianWidth = this.addNewCoupletForm.get("medianWidth").value * 1.0;
    couplet.divisionType = this.addNewCoupletForm.get("divisionType").value;
    primary.roadId = this.primaryHighway.roadId;
    primary.dir = this.primaryDir;
    let primaryStartRp = this.addNewCoupletForm.get("primaryFromRpCtrl").value;
    primary.startRpName = primaryStartRp.name;

    primary.startOffset = this.addNewCoupletForm.get("primaryFromOffsetCtrl").value * 1.0;
    let primaryEndRp = this.addNewCoupletForm.get("primaryToRpCtrl").value;
    primary.endRpName = primaryEndRp.name;

    primary.endOffset = this.addNewCoupletForm.get("primaryToOffsetCtrl").value * 1.0;


    secondary.roadId = this.secondaryHighway.roadId;
    secondary.dir = this.secondaryDir;
    let secondaryStartRp = this.addNewCoupletForm.get("secondaryFromRpCtrl").value;
    secondary.startRpName = secondaryStartRp.name;

    secondary.startOffset = this.addNewCoupletForm.get("secondaryFromOffsetCtrl").value  * 1.0;
    let secondaryEndRp = this.addNewCoupletForm.get("secondaryToRpCtrl").value;
    secondary.endRpName = primaryEndRp.name;

    secondary.endOffset = this.addNewCoupletForm.get("secondaryToOffsetCtrl").value * 1.0;

    couplet.primary = primary;
    couplet.secondary = secondary;

    this.postNewCouplet(couplet);
  }

  postNewCouplet(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post(this.highwayService.baseUrl+'couplet', body, options)
      .subscribe(
        data => {this.httpresult='success'; console.log("succeeded")},
        (err: Response) => {
          console.log(`Backend returned code ${err.status}, body was: ${err.text()}`);
          err.text().then(res=>this.httpresult = res);
        }
      );
  }
}
