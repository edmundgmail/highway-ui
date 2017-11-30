import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Project} from "../models/project";
import {SimpleHighway} from "../models/highway";

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {
  projectTypes = ['projectTypeA','projectTypeB'];
  programs = ['program1','program2'];
  addNewProjectForm;
  currentHighway : SimpleHighway;
  httpresult;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
    this.highwayService.currentHighwaySelected$.subscribe(value => this.currentHighway = value);
    this.addNewProjectForm = this.formBuilder.group({
      projectType: this.formBuilder.control(null),
      projectCode: this.formBuilder.control(null),
      federalNumber: this.formBuilder.control(null),
      stateNumber: this.formBuilder.control(null),
      projectName: this.formBuilder.control(null),
      program: this.formBuilder.control(null),
      cost: this.formBuilder.control('0.0'),
      projectManager: this.formBuilder.control(null),
      completionDate: this.formBuilder.control(new Date())
    });
  }

  ngOnInit() {
  }

  onResetForm() {
   // window.location.reload();
  }

  onSubmitForm() {
    let project = new Project();
    project.roadId = this.currentHighway.roadId;
    project.roadName = this.currentHighway.roadName;
    project.projectType = this.addNewProjectForm.get("projectType").value;
    project.projectCode = this.addNewProjectForm.get("projectCode").value;
    project.federalNumber = this.addNewProjectForm.get("federalNumber").value;
    project.stateNumber = this.addNewProjectForm.get("stateNumber").value;
    project.projectName = this.addNewProjectForm.get("projectName").value;
    project.program = this.addNewProjectForm.get("program").value;
    project.cost = this.addNewProjectForm.get("cost").value * 1.0;
    project.projectManager = this.addNewProjectForm.get("projectManager").value;
    project.completionDate = this.addNewProjectForm.get("completionDate").value;

    this.postNewProject(project);
  }

  postNewProject(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post(this.highwayService.baseUrl + 'project', body, options)
      .subscribe(
        data => {console.log("succeeded"); this.onResetForm(); this.httpresult='success';},
        (err: Response) => {
          this.httpresult = `Backend returned code ${err.status}, body was: ${err.text()}`
        }
      );
  }

}
