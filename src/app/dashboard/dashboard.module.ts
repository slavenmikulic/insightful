import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardStatisticComponent } from './components/dashboard-statistic/dashboard-statistic.component';
import { DashboardStore } from './dashboard.store';
import { TimeFormatPipe } from '../core/pipes/time-format.pipe';
import { MatError } from '@angular/material/form-field';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ProgressCircleComponent } from '../core/components/progress-circle/progress-circle.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EmployeesTableComponent } from '../core/components/employees-table/employees-table.component';

@NgModule({
  declarations: [DashboardComponent, DashboardStatisticComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TimeFormatPipe,
    MatError,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    ProgressCircleComponent,
    MatProgressSpinner,
    EmployeesTableComponent
  ],
  providers: [DashboardStore]
})
export class DashboardModule {}
