import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { getEndDayDate } from '../../../../core/utils/time-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-employee-shifts-form',
  templateUrl: './dashboard-employee-shifts-form.component.html',
  styleUrl: './dashboard-employee-shifts-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEmployeeShiftsFormComponent implements OnChanges {
  @Input({ required: true }) form!: FormArray<FormGroup<IShiftForm>>;
  @Input() shiftDays!: Date[];

  dataSource!: MatTableDataSource<FormGroup<IShiftForm>>;

  public filterDate = new FormControl<Date | null>(null);

  displayColumns = ['shift', 'clockIn', 'clockOut', 'totalTime'];

  constructor() {
    this.filterDate.valueChanges.pipe(takeUntilDestroyed()).subscribe(date => this.onChangeFilter(date));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) {
      this.dataSource = new MatTableDataSource<FormGroup<IShiftForm>>(this.form.controls);
      this.dataSource.filterPredicate = this.filterPredicate;
    }
  }

  public onChangeFilter(day: Date | null): void {
    this.dataSource.filter = day?.toDateString() ?? '';
  }

  private filterPredicate(data: FormGroup<IShiftForm>, filter: string): boolean {
    if (!filter) {
      return true;
    }

    const filterDate = new Date(filter);
    const clockIn = data.value.clockIn?.getTime();
    if (clockIn) {
      return clockIn > filterDate.getTime() && clockIn < getEndDayDate(filterDate).getTime();
    }

    return false;
  }
}
