import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IEmployee } from '../../../core/employee/intefaces/employee.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormGroup } from '@angular/forms';
import { IEmployeeForm } from '../../interfaces/employee-form.interface';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { IEmployeeEditForm } from '../../interfaces/employee-edit-form.interface';

@Component({
  selector: 'app-employees-edit-dialog',
  templateUrl: './employees-edit-dialog.component.html',
  styleUrl: './employees-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesEditDialogComponent {
  employees = inject<IEmployee[]>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  form = new FormGroup<IEmployeeEditForm>({
    employees: new FormArray<FormGroup<IEmployeeForm>>([]),
    shifts: new FormArray<FormGroup<IShiftForm>>([])
  });

  public onSave(): void {
    const employeesForSave: unknown[] = [];
    const shiftsForSave: unknown[] = [];

    const changedEmployees = this.employeesFormArray.controls.filter(employeeForm => employeeForm.dirty);
    for (const employeeForm of changedEmployees) {
      employeesForSave.push({
        id: employeeForm.get('id')?.value,
        name: employeeForm.get('name')?.value,
        email: employeeForm.get('email')?.value,
        hourlyRate: employeeForm.get('hourlyRate')?.value,
        hourlyRateOvertime: employeeForm.get('hourlyRateOvertime')?.value
      });
    }

    const changedShifts = this.shiftsFormArray.controls.filter(shiftForm => shiftForm.dirty);
    for (const shiftForm of changedShifts) {
      shiftsForSave.push({
        id: shiftForm.get('id')?.value,
        clockIn: shiftForm.get('clockIn')?.value?.getTime(),
        clockOut: shiftForm.get('clockOut')?.value?.getTime(),
        employeeId: shiftForm.get('employeeId')?.value
      });
    }

    this.dialogRef.close({ employees: employeesForSave, shifts: shiftsForSave });
  }

  get employeesFormArray(): FormArray<FormGroup<IEmployeeForm>> {
    return this.form.get('employees') as FormArray<FormGroup<IEmployeeForm>>;
  }

  get shiftsFormArray(): FormArray<FormGroup<IShiftForm>> {
    return this.form.get('shifts') as FormArray<FormGroup<IShiftForm>>;
  }
}
