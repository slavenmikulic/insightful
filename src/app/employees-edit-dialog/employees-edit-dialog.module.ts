import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { ShiftsFormComponent } from './components/shifts-form/shifts-form.component';
import { EmployeesEditDialogComponent } from './components/employees-edit-dialog/employees-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
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
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { TimeFormatPipe } from '../core/pipes/time-format.pipe';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { ShiftFilterComponent } from './components/shift-filter/shift-filter.component';
import { ShiftTotalTimeComponent } from './components/shift-total-time/shift-total-time.component';
import { HourInputComponent } from '../core/components/hour-input/hour-input.component';

@NgModule({
  declarations: [
    EmployeeFormComponent,
    ShiftsFormComponent,
    EmployeesEditDialogComponent,
    ShiftFilterComponent,
    ShiftTotalTimeComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    TimeFormatPipe,
    MatHeaderCellDef,
    CdkVirtualScrollViewport,
    TableVirtualScrollModule,
    HourInputComponent
  ]
})
export class EmployeesEditDialogModule {}
