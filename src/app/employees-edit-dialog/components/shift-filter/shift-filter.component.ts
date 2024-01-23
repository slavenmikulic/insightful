import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { FormControl, FormGroup } from '@angular/forms';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { getEndDayDate } from '../../../core/utils/time-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shift-filter',
  templateUrl: './shift-filter.component.html',
  styleUrl: './shift-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftFilterComponent implements OnChanges {
  @Input({ required: true }) dataSource!: TableVirtualScrollDataSource<FormGroup<IShiftForm>>;
  @Input({ required: true }) shiftDays!: Date[];

  @Output() filterDateChange = new EventEmitter<Date | null>();

  filterControl = new FormControl<Date | null>(null);

  constructor() {
    this.filterControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(date => this.filterDateChange.emit(date));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.dataSource.filterPredicate = this.filterPredicate;
    }
  }

  private filterPredicate(data: FormGroup<IShiftForm>, filter: string): boolean {
    if (!filter) {
      return true;
    }

    const filterDate = new Date(filter);
    const clockIn = data.value.clockIn?.getTime();
    const clockOut = data.value.clockOut?.getTime();

    let isValid = false;
    if (clockIn) {
      isValid = clockIn > filterDate.getTime() && clockIn < getEndDayDate(filterDate).getTime();
    }
    if (clockOut) {
      isValid = isValid || (clockOut > filterDate.getTime() && clockOut < getEndDayDate(filterDate).getTime());
    }

    return isValid;
  }
}
