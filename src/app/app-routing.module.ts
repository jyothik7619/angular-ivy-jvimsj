import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { InformationComponent } from './components/information/information.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { DieselTableComponent } from './components/diesel-table/diesel-table.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { ExportDataComponent } from './components/export-data/export-data.component';




const routes: Routes = [
  { path: '', redirectTo: 'information', pathMatch: 'full' },
  { path: 'information', component: InformationComponent },
  { path: 'left-panel', component: LeftPanelComponent },
  { path: 'diesel-table', component: DieselTableComponent },
  { path: 'analyze', component: AnalyzeComponent },
  { path: 'export-data', component: ExportDataComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
