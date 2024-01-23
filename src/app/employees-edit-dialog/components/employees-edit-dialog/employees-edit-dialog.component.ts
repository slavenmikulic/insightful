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
    employees: new FormArray<FormGroup<IEmployeeForm>>([])
  });

  public onSave(): void {
    const employeesForSave: unknown[] = [];
    const shiftsForSave: unknown[] = [];

    for (const employeeForm of this.employeesFormArray.controls) {
      if (!employeeForm.dirty) {
        continue;
      }

      employeesForSave.push({
        id: employeeForm.get('id')?.value,
        name: employeeForm.get('name')?.value,
        email: employeeForm.get('email')?.value,
        hourlyRate: employeeForm.get('hourlyRate')?.value,
        hourlyRateOvertime: employeeForm.get('hourlyRateOvertime')?.value
      });

      const shifts = employeeForm.get('shifts') as FormArray<FormGroup<IShiftForm>>;
      shifts?.controls.forEach(shift => {
        if (shift.dirty) {
          shiftsForSave.push({
            id: shift.get('id')?.value,
            clockIn: shift.get('clockIn')?.value?.getTime(),
            clockOut: shift.get('clockOut')?.value?.getTime(),
            employeeId: shift.get('employeeId')?.value
          });
        }
      });
    }

    this.dialogRef.close({ employees: employeesForSave, shifts: shiftsForSave });
  }

  get employeesFormArray(): FormArray<FormGroup<IEmployeeForm>> {
    return this.form.get('employees') as FormArray<FormGroup<IEmployeeForm>>;
  }
}
