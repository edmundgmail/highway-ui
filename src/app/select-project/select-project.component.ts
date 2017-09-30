import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Project} from "../models/project";
import {Highway} from "../models/highway";
import {HighwayService} from "../services/highway.service";

@Component({
  selector: 'app-select-project',
  templateUrl: './select-project.component.html',
  styleUrls: ['./select-project.component.css']
})
export class SelectProjectComponent implements OnInit {
  projectCtrl = new FormControl();
  projects: Project[];

  constructor(private highwayService : HighwayService) {
    this.projects =   highwayService.getProjects();
    this.projectCtrl.valueChanges.subscribe( value => this.uponChange.emit(value));
  }

  @Output() uponChange = new EventEmitter();

  ngOnInit() {
  }

}
