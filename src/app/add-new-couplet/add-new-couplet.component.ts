import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http, RequestOptions,Headers} from "@angular/http";
import {UtilsService} from "../services/utils-service";
import {isNullOrUndefined} from "util";
import {SimpleHighway} from "../models/highway";
import {RP} from "../models/segment-point";

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
  httpresult;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http,  private utilsService: UtilsService) {
    this.addNewCoupletForm = this.formBuilder.group({
      primaryFromRpCtrl: this.formBuilder.control(null),
      primaryFromOffsetCtrl: this.formBuilder.control(null),
      primaryToRpCtrl: this.formBuilder.control(null),
      primaryToOffsetCtrl: this.formBuilder.control(null),
      coupletType: this.formBuilder.control(null),
      medianType: this.formBuilder.control(null),
      medianWidth: this.formBuilder.control(null),
      dividerType: this.formBuilder.control(null),
      editDate: this.formBuilder.control(null)
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

  getRPs(road: SimpleHighway, dir: string)  {
    return this.http.get(this.highwayService.baseUrl +'highway/rps/'+road.roadId+"/"+dir).map(res=> res.json() as RP[]);
  }


  ngOnInit() {
  }

  onResetForm() {
  }

  onSubmitForm() {

  }

  postNewCouplet(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)
    //this.http.get('http://localhost:5000/highway').forEach( res=> console.log(res));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://localhost:5000/couplet', body, options)
      .subscribe(
        data => {this.httpresult='success'; console.log("succeeded")},
        (err: Response) => {
          console.log(`Backend returned code ${err.status}, body was: ${err.text()}`);
          err.text().then(res=>this.httpresult = res);
        }
      );
  }
}
