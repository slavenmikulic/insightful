import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployeeForm } from '../../interfaces/employee-form.interface';
import { IEmployee } from '../../../core/employee/intefaces/employee.interface';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { IShift } from '../../../core/shift/shift.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnChanges {
  @Input({ required: true }) form!: FormArray<FormGroup<IEmployeeForm>>;
  @Input({ required: true }) employee!: IEmployee;

  public employeeForm!: FormGroup<IEmployeeForm>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.prepareFormGroup(this.employee);
    }
  }

  private prepareFormGroup(employee: IEmployee): void {
    this.employeeForm = this.prepareEmployeeFormArrayGroup(employee);
    const formIndex = this.form.controls.findIndex(
      (formGroup: FormGroup<IEmployeeForm>) => this.employeeForm === formGroup
    );

    if (formIndex > -1) {
      this.form.at(formIndex).patchValue(this.employeeForm.value);
    } else {
      this.form.push(this.employeeForm);
    }
  }

  private prepareEmployeeFormArrayGroup(employee: IEmployee): FormGroup<IEmployeeForm> {
    return new FormGroup<IEmployeeForm>({
      id: new FormControl(employee.id, Validators.required),
      name: new FormControl(employee.name, Validators.required),
      email: new FormControl(employee.email, Validators.required),
      hourlyRate: new FormControl(employee.hourlyRate, Validators.required),
      hourlyRateOvertime: new FormControl(employee.hourlyRateOvertime, Validators.required),
      shifts: this.prepareShiftsFormArray(employee.shifts)
    });
  }

  private prepareShiftsFormArray(shifts: IShift[]): FormArray<FormGroup<IShiftForm>> {
    const formArray = new FormArray<FormGroup<IShiftForm>>([]);

    for (const shiftData of shifts) {
      formArray.push(
        new FormGroup<IShiftForm>({
          id: new FormControl(shiftData.id, Validators.required),
          clockIn: new FormControl(shiftData.clockIn, Validators.required),
          clockOut: new FormControl(shiftData.clockOut, Validators.required),
          employeeId: new FormControl(shiftData.employeeId, Validators.required)
        })
      );
    }

    return formArray;
  }
}
