import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { getEndDayDate } from '../../../core/utils/time-utils';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({
  selector: 'app-shifts-form',
  templateUrl: './shifts-form.component.html',
  styleUrl: './shifts-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftsFormComponent implements OnChanges {
  @Input({ required: true }) form!: FormArray<FormGroup<IShiftForm>>;
  @Input() shiftDays!: Date[];

  dataSource!: TableVirtualScrollDataSource<FormGroup<IShiftForm>>;

  displayColumns = ['shift', 'clockIn', 'clockOut', 'totalTime'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) {
      this.dataSource = new TableVirtualScrollDataSource<FormGroup<IShiftForm>>(this.form.controls);
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
