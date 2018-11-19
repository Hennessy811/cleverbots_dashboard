import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GridComponent} from "./grid/grid.component";
import {HistogramComponent} from "./histogram/histogram.component";

const routes: Routes = [
  {path: '', redirectTo: 'hg', pathMatch: 'full'},
  {path: 'grid', component: GridComponent},
  {path: 'hg', component: HistogramComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
