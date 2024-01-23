import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardStatisticComponent } from './components/dashboard-statistic/dashboard-statistic.component';
import { DashboardStore } from './dashboard.store';
import { TimeFormatPipe } from '../core/pipes/time-format.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { DashboardEmployeesTableComponent } from './components/dashboard-employees-table/dashboard-employees-table.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { EmployeesEditDialogModule } from '../employees-edit-dialog/employees-edit-dialog.module';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { DashboardProgressCircleComponent } from './components/dashboard-progress-circle/dashboard-progress-circle.component';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardStatisticComponent,
    DashboardEmployeesTableComponent,
    DashboardProgressCircleComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TimeFormatPipe,
    MatProgressSpinner,
    MatError,
    MatTable,
    MatCheckbox,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    CdkVirtualScrollViewport,
    TableVirtualScrollModule,
    EmployeesEditDialogModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon
  ],
  providers: [DashboardStore]
})
export class DashboardModule {}
