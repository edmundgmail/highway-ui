import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {AddNewHighwayComponent} from './add-new-highway/add-new-highway.component';
import {AddSegmentComponent} from './add-segment/add-segment.component';
import {EditLanesComponent} from "./edit-lanes/edit-lanes.component";
import {EditPavementLayersComponent} from "./edit-pavement-layers/edit-pavement-layers.component";
import {EditRoadFeaturesComponent} from "./edit-road-features/edit-road-features.component";
import {TransferSegmentComponent} from "./transfer-segment/transfer-segment.component";
import {RemoveSegmentComponent} from "./remove-segment/remove-segment.component";
import {AddNewRampComponent} from "./add-new-ramp/add-new-ramp.component";

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
    path: 'add-segment',
    component: AddSegmentComponent
  },
  {
    path: 'remove-segment',
    component: RemoveSegmentComponent
  },
  {
    path: 'edit-lanes',
    component: EditLanesComponent
  }
  ,
  {
    path: 'add-new-ramp',
    component: AddNewRampComponent
  }
  , {
    path: 'edit-pavement-layers',
    component: EditPavementLayersComponent
  }  ,
  {
    path: 'edit-road-features',
    component: EditRoadFeaturesComponent
  },
  {
    path: 'transfer-segment',
    component: TransferSegmentComponent
  }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
