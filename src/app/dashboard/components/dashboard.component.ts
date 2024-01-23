import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardStore } from '../dashboard.store';
import { IShift } from '../../core/shift/shift.interface';
import { IEmployee } from '../../core/employee/intefaces/employee.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  dashboardStore = inject(DashboardStore);

  constructor() {
    this.dashboardStore.fetch();
  }

  public updateEmployees(data: { employees: IEmployee[]; shifts: IShift[] }): void {
    if (data.employees.length) {
      this.dashboardStore.editEmployeesEffect(data.employees);
    }

    if (data.shifts.length) {
      this.dashboardStore.editShiftsEffect(data.shifts);
    }
  }
}
