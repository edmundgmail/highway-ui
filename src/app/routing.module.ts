import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {AddNewHighwayComponent} from './add-new-highway/add-new-highway.component';
import {EditDirectionsComponent} from './edit-directions/edit-directions.component';
import {AddSegmentComponent} from './add-segment/add-segment.component';
import {EditLanesComponent} from "./edit-lanes/edit-lanes.component";
import {EditPavementLayersComponent} from "./edit-pavement-layers/edit-pavement-layers.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'add-new-highway',
    component: AddNewHighwayComponent
  },
  {
    path: 'edit-directions',
    component: EditDirectionsComponent
  },
  {
    path: 'add-segment',
    component: AddSegmentComponent
  },
  {
    path: 'edit-lanes',
    component: EditLanesComponent
  }

  ,
  {
    path: 'edit-pavement-layers',
    component: EditPavementLayersComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
