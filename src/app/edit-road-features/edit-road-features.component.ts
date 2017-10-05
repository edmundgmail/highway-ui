import { Component, OnInit } from '@angular/core';
import {HighwayService} from "../services/highway.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-edit-road-features',
  templateUrl: './edit-road-features.component.html',
  styleUrls: ['./edit-road-features.component.css']
})
export class EditRoadFeaturesComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, highwayService: HighwayService) {
  }

  ngOnInit() {
  }

  onSubmitForm() {
  }
}
