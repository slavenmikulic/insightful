import { FormControl } from '@angular/forms';

export interface IEmployeeForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  hourlyRate: FormControl<number | null>;
  hourlyRateOvertime: FormControl<number | null>;
}
