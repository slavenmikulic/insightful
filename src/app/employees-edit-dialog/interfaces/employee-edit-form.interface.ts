import { FormArray, FormGroup } from '@angular/forms';
import { IEmployeeForm } from './employee-form.interface';

export interface IEmployeeEditForm {
  employees: FormArray<FormGroup<IEmployeeForm>>;
}
