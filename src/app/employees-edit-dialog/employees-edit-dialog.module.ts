import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { ShiftsFormComponent } from './components/shifts-form/shifts-form.component';
import { EmployeesEditDialogComponent } from './components/employees-edit-dialog/employees-edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { TimeFormatPipe } from '../core/pipes/time-format.pipe';
import { ShiftHourInputComponent } from './components/shift-hour-input/shift-hour-input.component';

@NgModule({
  declarations: [EmployeeFormComponent, ShiftsFormComponent, EmployeesEditDialogComponent, ShiftHourInputComponent],
  imports: [
    CommonModule,
    FormsModule,
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
    MatDatepickerInput,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    TimeFormatPipe,
    MatHeaderCellDef
  ]
})
export class EmployeesEditDialogModule {}
