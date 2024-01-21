import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardEmployeesEditDialogComponent } from './components/dashboard-employees-edit-dialog/dashboard-employees-edit-dialog.component';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { DashboardEmployeeFormComponent } from './components/dashboard-employee-form/dashboard-employee-form.component';
import { DashboardEmployeeShiftsFormComponent } from './components/dashboard-employee-shifts-form/dashboard-employee-shifts-form.component';
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
import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';

@NgModule({
  declarations: [
    DashboardEmployeesEditDialogComponent,
    DashboardEmployeeFormComponent,
    DashboardEmployeeShiftsFormComponent
  ],
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatInput,
    MatLabel,
    MatFormField,
    MatTable,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    TableVirtualScrollModule
  ]
})
export class DashboardEmployeesEditDialogModule {}
