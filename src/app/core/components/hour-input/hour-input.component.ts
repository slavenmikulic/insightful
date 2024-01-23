import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hour-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hour-input.component.html',
  styleUrl: './hour-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HourInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourInputComponent implements ControlValueAccessor {
  hours = new FormControl<number | null>(null);
  minutes = new FormControl<number | null>(null);
  value: Date | null = null;

  constructor() {
    this.hours.valueChanges.pipe(takeUntilDestroyed()).subscribe(hours => this.onChangeHours(hours));
    this.minutes.valueChanges.pipe(takeUntilDestroyed()).subscribe(minutes => this.onChangeMinutes(minutes));
  }

  public onChangeHours(hours: number | null): void {
    const value = this.value;

    if (value) {
      value.setHours(hours ?? 0);
      this.onChange(value);
    }
  }

  public onChangeMinutes(minutes: number | null): void {
    const value = this.value;
    if (value) {
      value.setMinutes(minutes ?? 0);
      this.onChange(value);
    }
  }

  writeValue(value: Date): void {
    this.value = value;

    if (value) {
      const hours = value.getHours();
      const minutes = value.getMinutes();
      this.hours.setValue(hours, { emitEvent: false });
      this.minutes.setValue(minutes, { emitEvent: false });
    }
  }

  registerOnChange(fn: OnChangeFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchFunction): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.hours.disable();
      this.minutes.disable();
    } else {
      this.hours.enable();
      this.minutes.enable();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange = (_: Date): void => {};
  private onTouched = (): void => {};
}

type OnChangeFunction = (value: Date) => void;
type OnTouchFunction = () => void;
