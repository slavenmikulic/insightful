import { IEmployeeShifts } from '../employee.interface';
import { IDashboardEmployeeStatistic } from '../../../dashboard/interfaces/dashboard-statistic.interface';
import {
  calculateClockInUntilEndOfDay,
  calculateClockOutForNextDay,
  getHoursFromTimestamp,
  getOvertimeHours,
  getRegularHours
} from '../../utils/time-utils';
import { IShift } from '../../shift/shift.interface';

export const calculateEmployeeShiftsStatistic = (
  shifts: IEmployeeShifts,
  hourlyRate: number,
  hourlyRateOvertime: number
): IDashboardEmployeeStatistic => {
  const shiftStatistic: IDashboardEmployeeStatistic = {
    totalClockedIn: 0,
    regularAmount: 0,
    overtimeAmount: 0
  };

  let nextDayShiftTimestamp = 0;

  for (const shiftsPerDay of shifts.values()) {
    const shiftsData = calculateShiftsPerDay(shiftsPerDay);

    const total = shiftsData.total + nextDayShiftTimestamp;
    nextDayShiftTimestamp = shiftsData.nextDayShiftTimestamp;

    shiftStatistic.totalClockedIn += total;
    shiftStatistic.regularAmount += getRegularHours(getHoursFromTimestamp(total)) * hourlyRate;
    shiftStatistic.overtimeAmount += getOvertimeHours(getHoursFromTimestamp(total)) * hourlyRateOvertime;
  }

  // If user is clocked out last day, but they don't have clockIn for next day
  if (nextDayShiftTimestamp) {
    const total = nextDayShiftTimestamp;

    shiftStatistic.totalClockedIn += total;
    shiftStatistic.regularAmount += getRegularHours(getHoursFromTimestamp(total)) * hourlyRate;
    shiftStatistic.overtimeAmount += getOvertimeHours(getHoursFromTimestamp(total)) * hourlyRateOvertime;
  }

  return shiftStatistic;
};

export const calculateShiftsPerDay = (shiftsPerDay: IShift[]): { nextDayShiftTimestamp: number; total: number } => {
  let nextDayShiftTimestamp = 0;
  const total = shiftsPerDay.reduce((total, shift) => {
    const isSameDay = shift.clockIn.getDate() === shift.clockOut.getDate();

    if (isSameDay) {
      return total + shift.clockOut.getTime() - shift.clockIn.getTime();
    }

    nextDayShiftTimestamp = calculateClockOutForNextDay(shift.clockOut);
    return total + calculateClockInUntilEndOfDay(shift.clockIn);
  }, 0);

  return { nextDayShiftTimestamp, total };
};
