import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Project} from "../models/project";
import {SimpleHighway} from "../models/highway";
import {HighwayService} from "../services/highway.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-select-project',
  templateUrl: './select-project.component.html',
  styleUrls: ['./select-project.component.css']
})
export class SelectProjectComponent implements OnInit {
  projectCtrl = new FormControl();
  projects: Project[];

  constructor(private highwayService : HighwayService, private http: Http) {
    this.http.get(this.highwayService.baseUrl + 'projects').subscribe(res=> this.projects = res.json() as Project[])
    this.projectCtrl.valueChanges.subscribe( value => this.uponChange.emit(value));
  }

  @Output() uponChange = new EventEmitter();

  ngOnInit() {
  }

}
