import { FormControl } from '@angular/forms';

export interface IShiftForm {
  id: FormControl<string | null>;
  clockIn: FormControl<Date | null>;
  clockOut: FormControl<Date | null>;
  employeeId: FormControl<string | null>;
}
