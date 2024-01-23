import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IShiftForm } from './shift-form.interface';

export interface IEmployeeForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  hourlyRate: FormControl<number | null>;
  hourlyRateOvertime: FormControl<number | null>;
  shifts: FormArray<FormGroup<IShiftForm>>;
}
