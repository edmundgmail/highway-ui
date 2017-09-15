import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RoutingModule } from './routing.module';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeroesComponent, SelectedHeroDialog } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroService } from './services/hero.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { AddNewHighwayComponent } from './add-new-highway/add-new-highway.component';
import { MdFormFieldModule } from '@angular/material';
import { EditDirectionsComponent } from './edit-directions/edit-directions.component';
import { AddSegmentComponent } from './add-segment/add-segment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent,
    SelectedHeroDialog,
    AddNewHighwayComponent,
    EditDirectionsComponent,
    AddSegmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MaterialModule,
    BrowserAnimationsModule,
    MdFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MdNativeDateModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent],
  entryComponents: [SelectedHeroDialog]
})
export class AppModule { }
