import { Component } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {IHash} from "./models/ihash";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent{
    titleDefault = 'Highway Management System' ;
    title;

    constructor(private router: Router){
      let pathToTitle = {};
      pathToTitle["/add-new-highway"] = "Add New Highway";
      pathToTitle["/add-segment"] = "Add New Segment";
      pathToTitle["/remove-segment"] = "Remove Segment";
      pathToTitle["/add-lanes"] = "Add Lanes";
      pathToTitle["/add-new-ramp"] = "Add New Ramp";
      pathToTitle["/add-new-couplet"] = "Add New Couplet";
      pathToTitle["/edit-pavement-layers"] = "Edit Pavement Layers";
      pathToTitle["/edit-road-features"] = "Edit Road Features";
      pathToTitle["/add-segment"] = "Add New Segment";
      pathToTitle["/transfer-segment"] = "Transfer Segment";
      pathToTitle["/add-new-project"] = "Add New Project";

      router.events.subscribe(
        (event)=>{
          if(event instanceof NavigationEnd)
          {
            this.title = pathToTitle[event.url];
            if(!this.title) this.title=this.titleDefault;
          }
        }
      );
    }
}
