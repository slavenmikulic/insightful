import { inject, Injectable } from '@angular/core';
import { IEmployee } from '../core/employee/employee.interface';
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
          const shiftData = calculateEmployeeShiftsStatistic(
            employee.shifts,
            employee.hourlyRate,
            employee.hourlyRateOvertime
          );

          return {
            totalClockedIn: employeeData.totalClockedIn + shiftData.totalClockedIn,
            regularAmount: employeeData.regularAmount + shiftData.regularAmount,
            overtimeAmount: employeeData.overtimeAmount + shiftData.overtimeAmount
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
      switchMap(() => combineLatest([this.employeeService.list(), this.shiftService.list()])),
      map(([employees, shifts]) => this.mapShiftsToEmployees(employees, shifts)),
      tapResponse(
        employees => this.setEmployees(employees),
        () => this.updateStatus('error')
      )
    )
  );

  private mapShiftsToEmployees(employees: IEmployee[], shifts: IShift[]): IEmployee[] {
    return employees.map(employee => {
      return {
        ...employee,
        shifts: this.groupShiftsByDate(shifts.filter(shift => shift.employeeId === employee.id))
      };
    });
  }

  private groupShiftsByDate(shifts: IShift[]): Map<string, IShift[]> {
    return shifts.reduce((shiftsGroupedByDate, shift) => {
      const date = shift.clockIn.toDateString();
      const shiftsForDate = shiftsGroupedByDate.get(date) || [];

      shiftsGroupedByDate.set(date, [...shiftsForDate, shift]);

      return shiftsGroupedByDate;
    }, new Map<string, IShift[]>());
  }
}
