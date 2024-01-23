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

  // calculate for all employees statistic
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

  readonly editEmployees = this.updater((state, employees: IEmployee[]) => ({
    ...state,
    employees: state.employees.map(employee => {
      const editedEmployee = employees.find(editedEmployee => editedEmployee.id === employee.id);

      // if user changed hourly rate or overtime rate, we need to recalculate employee shifts statistic
      if (
        editedEmployee?.hourlyRate !== employee.hourlyRate ||
        editedEmployee?.hourlyRateOvertime !== employee.hourlyRateOvertime
      ) {
        return {
          ...employee,
          ...editedEmployee,
          ...calculateEmployeeShiftsStatistic(
            employee.shifts,
            editedEmployee?.hourlyRate ?? employee.hourlyRate,
            editedEmployee?.hourlyRateOvertime ?? employee.hourlyRateOvertime
          )
        };
      }

      if (editedEmployee) {
        return { ...employee, ...editedEmployee };
      }

      return employee;
    })
  }));

  readonly editShifts = this.updater((state, shifts: IShift[]) => {
    // find only changed employees
    const changedShiftsForEmployees = state.employees.filter(employee =>
      shifts.some(shift => shift.employeeId === employee.id)
    );

    // update shifts for changed employees
    changedShiftsForEmployees.map(employee => {
      const employeeShifts = employee.shifts;
      for (const shift of shifts) {
        const index = employeeShifts.findIndex(employeeShift => employeeShift.id === shift.id);
        if (index > -1) {
          employeeShifts[index] = shift;
        }
      }

      return employee;
    });

    return {
      ...state,
      employees: state.employees.map(employee => {
        const editedEmployee = changedShiftsForEmployees.find(editedEmployee => editedEmployee.id === employee.id);
        if (editedEmployee) {
          // if user changed shifts, we need to recalculate employee shifts statistic
          return {
            ...editedEmployee,
            ...calculateEmployeeShiftsStatistic(
              employee.shifts,
              editedEmployee.hourlyRate,
              editedEmployee.hourlyRateOvertime
            )
          };
        }

        return employee;
      })
    };
  });

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

  readonly editEmployeesEffect = this.effect<IEmployee[]>((source$: Observable<IEmployee[]>) =>
    source$.pipe(
      switchMap(employees =>
        combineLatest(
          employees.map(employee =>
            this.employeeService.update(employee.id, employee).pipe(map(response => ({ ...employee, ...response })))
          )
        )
      ),
      tapResponse(
        employees => this.editEmployees(employees),
        error => console.error('something went wrong during the update of employees', error)
      )
    )
  );

  readonly editShiftsEffect = this.effect<IShift[]>((source$: Observable<IShift[]>) =>
    source$.pipe(
      switchMap(shifts => combineLatest(shifts.map(shift => this.shiftService.update(shift.id, shift)))),
      tapResponse(
        shifts => this.editShifts(shifts),
        error => console.error('something went wrong during the update of shifts', error)
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
