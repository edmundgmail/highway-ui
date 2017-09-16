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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddNewHighwayComponent,
    EditDirectionsComponent,
    AddSegmentComponent
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
