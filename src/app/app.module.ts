import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RoutingModule } from './routing.module';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AddNewHighwayComponent } from './add-new-highway/add-new-highway.component';
import { MdFormFieldModule } from '@angular/material';
import { EditDirectionsComponent } from './edit-directions/edit-directions.component';
import { AddSegmentComponent } from './add-segment/add-segment.component';
import {HighwayService} from "app/services/highway.service";
import { HighwayNameSelectComponent } from './highway-name-select/highway-name-select.component';
import { SelectSegmentPointComponent } from './select-segment-point/select-segment-point.component';
import { AddSegmentTableComponent } from './add-segment-table/add-segment-table.component';
import { SelectDirectionComponent } from './select-direction/select-direction.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddNewHighwayComponent,
    EditDirectionsComponent,
    AddSegmentComponent,
    HighwayNameSelectComponent,
    SelectSegmentPointComponent,
    AddSegmentTableComponent,
    SelectDirectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MdNativeDateModule
  ],
  providers: [HighwayService],
  bootstrap: [AppComponent],
  entryComponents: [DashboardComponent]
})
export class AppModule { }
