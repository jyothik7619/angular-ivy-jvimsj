import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartModule } from 'angular-highcharts';

import { InformationComponent } from './components/information/information.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { DieselTableComponent } from './components/diesel-table/diesel-table.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { ExportDataComponent } from './components/export-data/export-data.component';


@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    LeftPanelComponent,
    DieselTableComponent,
    AnalyzeComponent,
    ExportDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AgGridModule.withComponents([]),
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
