import { FormArray, FormGroup } from '@angular/forms';
import { IEmployeeForm } from './employee-form.interface';
import { IShiftForm } from './shift-form.interface';

export interface IEmployeeEditForm {
  employees: FormArray<FormGroup<IEmployeeForm>>;
  shifts: FormArray<FormGroup<IShiftForm>>;
}
