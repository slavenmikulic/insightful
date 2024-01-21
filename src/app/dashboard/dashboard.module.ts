import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardStatisticComponent } from './components/dashboard-statistic/dashboard-statistic.component';
import { DashboardStore } from './dashboard.store';
import { DashboardTotalClockedInComponent } from './components/dashboard-total-clocked-in/dashboard-total-clocked-in.component';
import { DashboardEmployeesTotalComponent } from './components/dashboard-employees-total/dashboard-employees-total.component';
import { TimeFormatPipe } from '../core/pipes/time-format.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatError } from '@angular/material/form-field';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardStatisticComponent,
    DashboardTotalClockedInComponent,
    DashboardEmployeesTotalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TimeFormatPipe,
    MatProgressSpinner,
    MatGridList,
    MatGridTile,
    MatError
  ],
  providers: [DashboardStore]
})
export class DashboardModule {}
