import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HighwayService} from "../services/highway.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {
  projectTypes = [];
  programs = [];
  addNewProjectForm;

  constructor(private formBuilder: FormBuilder, private highwayService: HighwayService, private http: Http) {
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
  }

  onSubmitForm() {
  }
}
