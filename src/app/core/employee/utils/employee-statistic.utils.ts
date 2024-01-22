import {
  calculateClockInUntilEndOfDay,
  getHoursFromTimestamp,
  getOvertimeHours,
  getRegularHours,
  getStartDayDate
} from '../../utils/time-utils';
import { IShift } from '../../shift/shift.interface';
import { IEmployeeStatistic } from '../intefaces/employee-statistic.interface';

/**
 * Calculates the statistics for an employee's shifts.
 */
export const calculateEmployeeShiftsStatistic = (
  shifts: IShift[],
  hourlyRate: number,
  hourlyRateOvertime: number
): IEmployeeStatistic => {
  let shiftStatistic: IEmployeeStatistic = {
    totalClockedIn: 0,
    regularAmount: 0,
    overtimeAmount: 0,
    workDays: []
  };

  if (!shifts.length) {
    return shiftStatistic;
  }

  const current: ICurrent = {
    day: getStartDayDate(shifts[0].clockIn),
    total: 0
  };

  for (const shift of shifts) {
    // if the shift is not on the same day as the current day, calculate the current day's total and update the current day
    const isDifferentDay = current.day.getDate() !== shift.clockIn.getDate();
    if (isDifferentDay) {
      shiftStatistic = calculateEmployeeStatistic(shiftStatistic, current, hourlyRate, hourlyRateOvertime);

      current.day = getStartDayDate(shift.clockIn);
      current.total = 0;
    }

    const isSameDay = shift.clockIn.getDate() === shift.clockOut.getDate();
    if (isSameDay) {
      current.total += shift.clockOut.getTime() - shift.clockIn.getTime();
    } else {
      // calculate the time from clock in until the end of the day
      current.total += calculateClockInUntilEndOfDay(shift.clockIn);

      shiftStatistic = calculateEmployeeStatistic(shiftStatistic, current, hourlyRate, hourlyRateOvertime);

      // this is for next day
      current.day = getStartDayDate(shift.clockOut);
      current.total = shift.clockOut.getTime() - current.day.getTime();
    }
  }

  shiftStatistic = calculateEmployeeStatistic(shiftStatistic, current, hourlyRate, hourlyRateOvertime);

  return shiftStatistic;
};

const calculateEmployeeStatistic = (
  statistic: IEmployeeStatistic,
  current: ICurrent,
  hourlyRate: number,
  hourlyRateOvertime: number
): IEmployeeStatistic => {
  return {
    totalClockedIn: statistic.totalClockedIn + current.total,
    regularAmount: statistic.regularAmount + getRegularHours(getHoursFromTimestamp(current.total)) * hourlyRate,
    overtimeAmount:
      statistic.overtimeAmount + getOvertimeHours(getHoursFromTimestamp(current.total)) * hourlyRateOvertime,
    workDays: current.day ? [...statistic.workDays, current.day] : statistic.workDays
  };
};

interface ICurrent {
  day: Date;
  total: number;
}
