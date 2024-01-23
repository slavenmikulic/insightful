import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployeeForm } from '../../interfaces/employee-form.interface';
import { IEmployee } from '../../../core/employee/intefaces/employee.interface';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { IShift } from '../../../core/shift/shift.interface';
import { IEmployeeEditForm } from '../../interfaces/employee-edit-form.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnChanges {
  @Input({ required: true }) form!: FormGroup<IEmployeeEditForm>;
  @Input({ required: true }) employee!: IEmployee;

  public employeeForm!: FormGroup<IEmployeeForm>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.prepareEmployeeFormGroup(this.employee);
      this.prepareShiftsFormArray(this.employee.shifts);
    }
  }

  private prepareEmployeeFormGroup(employee: IEmployee): void {
    this.employeeForm = this.prepareEmployeeFormArrayGroup(employee);
    const formIndex = this.employeesFormArray.controls.findIndex(
      (formGroup: FormGroup<IEmployeeForm>) => this.employeeForm.value.id === formGroup.value.id
    );

    if (formIndex > -1) {
      this.employeesFormArray.at(formIndex).patchValue(this.employeeForm.value);
    } else {
      this.employeesFormArray.push(this.employeeForm);
    }
  }

  private prepareEmployeeFormArrayGroup(employee: IEmployee): FormGroup<IEmployeeForm> {
    return new FormGroup<IEmployeeForm>({
      id: new FormControl(employee.id, Validators.required),
      name: new FormControl(employee.name, Validators.required),
      email: new FormControl(employee.email, Validators.required),
      hourlyRate: new FormControl(employee.hourlyRate, Validators.required),
      hourlyRateOvertime: new FormControl(employee.hourlyRateOvertime, Validators.required)
    });
  }

  private prepareShiftsFormArray(shifts: IShift[]): FormArray<FormGroup<IShiftForm>> {
    const formArray = new FormArray<FormGroup<IShiftForm>>([]);

    for (const shiftData of shifts) {
      const index = this.shiftsFormArray.controls.findIndex(formGroup => formGroup.value.id === shiftData.id);
      if (index > -1) {
        this.shiftsFormArray.at(index).patchValue(shiftData);
      } else {
        this.shiftsFormArray.push(this.createShiftFormGroup(shiftData));
      }
    }

    return formArray;
  }

  private createShiftFormGroup(shift: IShift): FormGroup<IShiftForm> {
    return new FormGroup<IShiftForm>({
      id: new FormControl(shift.id, Validators.required),
      clockIn: new FormControl(shift.clockIn, Validators.required),
      clockOut: new FormControl(shift.clockOut, Validators.required),
      employeeId: new FormControl(shift.employeeId, Validators.required)
    });
  }

  get shiftsFormArray(): FormArray<FormGroup<IShiftForm>> {
    return this.form.get('shifts') as FormArray<FormGroup<IShiftForm>>;
  }

  get employeesFormArray(): FormArray<FormGroup<IEmployeeForm>> {
    return this.form.get('employees') as FormArray<FormGroup<IEmployeeForm>>;
  }
}
