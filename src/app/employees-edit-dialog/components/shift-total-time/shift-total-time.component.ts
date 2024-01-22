import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { FormGroup } from '@angular/forms';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-shift-total-time',
  templateUrl: './shift-total-time.component.html',
  styleUrl: './shift-total-time.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftTotalTimeComponent implements OnChanges {
  @Input({ required: true }) form!: FormGroup<IShiftForm>;
  public totalTime$!: Observable<number>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) {
      this.totalTime$ = this.calculateTotalTime();
    }
  }

  private calculateTotalTime(): Observable<number> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      filter((data): data is { clockIn: Date; clockOut: Date } => !!data.clockIn && !!data.clockOut),
      map(data => data.clockOut.getTime() - data.clockIn.getTime())
    );
  }
}
