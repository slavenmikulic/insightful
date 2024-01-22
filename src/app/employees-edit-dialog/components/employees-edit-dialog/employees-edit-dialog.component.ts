import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IEmployee } from '../../../core/employee/intefaces/employee.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IShift } from '../../../core/shift/shift.interface';
import { IEmployeeForm } from '../../interfaces/employee-form.interface';
import { IShiftForm } from '../../interfaces/shift-form.interface';

@Component({
  selector: 'app-employees-edit-dialog',
  templateUrl: './employees-edit-dialog.component.html',
  styleUrl: './employees-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesEditDialogComponent {
  employees = inject<IEmployee[]>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  form = new FormGroup({
    employees: this.prepareEmployeeFormArray()
  });

  private prepareEmployeeFormArray(): FormArray<FormGroup<IEmployeeForm>> {
    return new FormArray<FormGroup<IEmployeeForm>>(
      this.employees.map(employee => {
        return new FormGroup<IEmployeeForm>({
          name: new FormControl(employee.name, Validators.required),
          hourlyRate: new FormControl(employee.hourlyRate, Validators.required),
          hourlyRateOvertime: new FormControl(employee.hourlyRateOvertime, Validators.required),
          shifts: this.prepareEmployeeShiftsFormArray(employee.shifts)
        });
      })
    );
  }

  private prepareEmployeeShiftsFormArray(shifts: IShift[]): FormArray<FormGroup<IShiftForm>> {
    const formArray = new FormArray<FormGroup<IShiftForm>>([]);
    for (const shiftData of shifts) {
      formArray.push(
        new FormGroup({
          clockIn: new FormControl(shiftData.clockIn, Validators.required),
          clockOut: new FormControl(shiftData.clockOut, Validators.required),
          totalTime: new FormControl(shiftData.clockOut.getTime() - shiftData.clockIn.getTime(), Validators.required)
        })
      );
    }

    return formArray;
  }

  get employeesFormArray(): FormArray<FormGroup<IEmployeeForm>> {
    return this.form.get('employees') as FormArray<FormGroup<IEmployeeForm>>;
  }
}
