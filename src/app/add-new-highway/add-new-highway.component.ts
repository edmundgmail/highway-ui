import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormService, DynamicFormControlModel } from "@ng2-dynamic-forms/core";


@Component({
  selector: 'app-add-new-highway',
  templateUrl: './add-new-highway.component.html',
  styleUrls: ['./add-new-highway.component.css']
})

export class AddNewHighwayComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }

  onChange($event) {
    console.log(`Material change event on: `, $event);
  }

}
