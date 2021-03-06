import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AddNewHighwayComponent } from './add-new-highway/add-new-highway.component';
import { AddSegmentComponent } from './add-segment/add-segment.component';
import {HighwayService} from 'app/services/highway.service';
import { HighwayNameSelectComponent } from './highway-name-select/highway-name-select.component';
import { SelectSegmentPointComponent } from './select-segment-point/select-segment-point.component';
import { AddSegmentTableComponent } from './add-segment-table/add-segment-table.component';
import { SelectDirectionComponent } from './select-direction/select-direction.component';
import { AddLanesComponent } from './edit-lanes/add-lanes.component';
import { SelectSegmentLanesTableComponent } from './select-segment-lanes-table/select-segment-lanes-table.component';
import { SelectProjectComponent } from './select-project/select-project.component';
import { EditPavementLayersComponent } from './edit-pavement-layers/edit-pavement-layers.component';
import { PavementLayerDetailTableComponent } from './pavement-layer-detail-table/pavement-layer-detail-table.component';
import { TreatmentDetailsDialogComponent } from './treatment-details-dialog/treatment-details-dialog.component';
import { EditRoadFeaturesComponent } from './edit-road-features/edit-road-features.component';
import { SelectSegmentTableComponent } from './select-segment-table/select-segment-table.component';
import { TransferSegmentComponent } from './transfer-segment/transfer-segment.component';
import {HttpClientModule} from '@angular/common/http';
import { RemoveSegmentComponent } from './remove-segment/remove-segment.component';
import { AddNewRampComponent } from './add-new-ramp/add-new-ramp.component';
import { AddNewCoupletComponent } from './add-new-couplet/add-new-couplet.component';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import {MaterialModule, MdDialogModule, MdFormFieldModule, MdNativeDateModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddNewHighwayComponent,
    AddSegmentComponent,
    HighwayNameSelectComponent,
    SelectSegmentPointComponent,
    AddSegmentTableComponent,
    SelectDirectionComponent,
    AddLanesComponent,
    SelectSegmentLanesTableComponent,
    SelectProjectComponent,
    EditPavementLayersComponent,
    PavementLayerDetailTableComponent,
    TreatmentDetailsDialogComponent,
    EditRoadFeaturesComponent,
    SelectSegmentTableComponent,
    TransferSegmentComponent,
    RemoveSegmentComponent,
    AddNewRampComponent,
    AddNewCoupletComponent,
    AddNewProjectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdFormFieldModule,
    MdDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MdNativeDateModule
  ],
  providers: [HighwayService],
  bootstrap: [AppComponent],
  entryComponents: [DashboardComponent, TreatmentDetailsDialogComponent]
})
export class AppModule { }
