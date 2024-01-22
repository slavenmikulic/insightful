import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shift-hour-input',
  templateUrl: './shift-hour-input.component.html',
  styleUrl: './shift-hour-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftHourInputComponent implements OnChanges {
  @Input({ required: true }) control!: FormControl<Date | null>;

  hours = new FormControl<number | null>(null);
  minutes = new FormControl<number | null>(null);

  constructor() {
    this.hours.valueChanges.pipe(takeUntilDestroyed()).subscribe(hours => this.onChangeHours(hours));
    this.minutes.valueChanges.pipe(takeUntilDestroyed()).subscribe(minutes => this.onChangeMinutes(minutes));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      const value = this.control.value;
      if (value) {
        const hours = value.getHours();
        const minutes = value.getMinutes();
        this.hours.setValue(hours, { emitEvent: false });
        this.minutes.setValue(minutes, { emitEvent: false });
      }
    }
  }

  public onChangeHours(hours: number | null): void {
    const value = this.control.value;

    if (value) {
      value.setHours(hours ?? 0);
      this.control.setValue(value);
    }
  }

  public onChangeMinutes(minutes: number | null): void {
    const value = this.control.value;
    if (value) {
      value.setMinutes(minutes ?? 0);
      this.control.setValue(value);
    }
  }
}
