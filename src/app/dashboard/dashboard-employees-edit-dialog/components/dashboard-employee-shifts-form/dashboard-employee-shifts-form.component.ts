import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IShiftForm } from '../../interfaces/shift-form.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({
  selector: 'app-dashboard-employee-shifts-form',
  templateUrl: './dashboard-employee-shifts-form.component.html',
  styleUrl: './dashboard-employee-shifts-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEmployeeShiftsFormComponent implements OnChanges {
  @Input({ required: true }) form!: FormArray<FormGroup<IShiftForm>>;
  @Input() shiftDays!: IterableIterator<number>;

  dataSource!: TableVirtualScrollDataSource<FormGroup<IShiftForm>>;
  days: number[] = [];

  displayColumns = ['shift', 'clockIn', 'clockOut', 'totalTime'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDays']) {
      this.days = this.shiftDays ? Array.from(this.shiftDays) : [];
    }

    if (changes['form']) {
      this.dataSource = new TableVirtualScrollDataSource<FormGroup<IShiftForm>>(this.form.controls);
    }
  }
}
