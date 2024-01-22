import { FormControl } from '@angular/forms';

export interface IShiftForm {
  clockIn: FormControl<Date | null>;
  clockOut: FormControl<Date | null>;
  totalTime: FormControl<number | null>;
}
