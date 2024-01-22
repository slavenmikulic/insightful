import { inject, Injectable } from '@angular/core';
import { IEmployee } from '../core/employee/intefaces/employee.interface';
import { EmployeeService } from '../core/employee/employee.service';
import { ShiftService } from '../core/shift/shift.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { IShift } from '../core/shift/shift.interface';
import { IDashboardEmployeeStatistic, IDashboardStatistic } from './interfaces/dashboard-statistic.interface';
import { calculateEmployeeShiftsStatistic } from '../core/employee/utils/employee-statistic.utils';

export type DashboardStatus = 'pending' | 'loading' | 'error' | 'success';

export interface DashboardState {
  employees: IEmployee[];
  status: DashboardStatus;
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  private employeeService = inject(EmployeeService);
  private shiftService = inject(ShiftService);

  constructor() {
    super({ employees: [], status: 'pending' });
  }

  // selectors
  readonly employees$ = this.select(state => state.employees);
  readonly status$ = this.select(state => state.status);
  readonly employeesCount$ = this.select(this.employees$, employees => employees.length);

  readonly employeeStatistic$: Observable<IDashboardEmployeeStatistic> = this.select(
    this.employees$,
    (employees: IEmployee[]) =>
      employees.reduce(
        (employeeData, employee) => {
          return {
            totalClockedIn: employeeData.totalClockedIn + employee.totalClockedIn,
            regularAmount: employeeData.regularAmount + employee.regularAmount,
            overtimeAmount: employeeData.overtimeAmount + employee.overtimeAmount
          };
        },
        { totalClockedIn: 0, regularAmount: 0, overtimeAmount: 0 }
      )
  );

  readonly statistic$: Observable<IDashboardStatistic> = this.select(
    this.employeeStatistic$,
    this.employeesCount$,
    (employeeStatistic, employeesCount) => ({
      ...employeeStatistic,
      totalEmployees: employeesCount
    })
  );

  // updaters
  readonly setEmployees = this.updater((state, employees: IEmployee[]) => ({
    ...state,
    status: 'success',
    employees
  }));

  readonly updateStatus = this.updater((state, status: DashboardStatus) => ({
    ...state,
    status
  }));

  // effects
  readonly fetch = this.effect((source$: Observable<void>) =>
    source$.pipe(
      tap(() => this.updateStatus('loading')),
      switchMap(() =>
        combineLatest([this.employeeService.list(), this.shiftService.list({ _sort: 'clockIn', _order: 'asc' })])
      ),
      map(([employees, shifts]) => this.mapShiftsToEmployees(employees, shifts)),
      tapResponse(
        employees => this.setEmployees(employees),
        () => this.updateStatus('error')
      )
    )
  );

  private mapShiftsToEmployees(employees: IEmployee[], shifts: IShift[]): IEmployee[] {
    return employees.map(employee => {
      const employeeShifts = shifts.filter(shift => shift.employeeId === employee.id);
      return {
        ...employee,
        shifts: employeeShifts,
        ...calculateEmployeeShiftsStatistic(employeeShifts, employee.hourlyRate, employee.hourlyRateOvertime)
      };
    });
  }
}
