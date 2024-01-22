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
import { DashboardEmployeesEditDialogModule } from './dashboard-employees-edit-dialog/dashboard-employees-edit-dialog.module';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';

@NgModule({
  declarations: [DashboardComponent, DashboardStatisticComponent, DashboardEmployeesTableComponent],
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
    DashboardEmployeesEditDialogModule,
    CdkVirtualScrollViewport,
    TableVirtualScrollModule
  ],
  providers: [DashboardStore]
})
export class DashboardModule {}
