import { calculateEmployeeShiftsStatistic } from './employee-statistic.utils';
import { IEmployee } from '../intefaces/employee.interface';
import { getEndDayDateTimestamp, getHoursFromTimestamp, getStartDayDateTimestamp } from '../../utils/time-utils';

describe('Employee Statistic Utils', () => {
  let employee: IEmployee;

  beforeEach(() => {
    employee = {
      id: '1',
      name: 'John Doe',
      hourlyRate: 10,
      hourlyRateOvertime: 15,
      shifts: new Map(),
      email: 'john@doe.com',
      regularAmount: 0,
      overtimeAmount: 0,
      totalClockedIn: 0
    };
  });

  it('should calculate shift statistics for an employee with no shifts', () => {
    const result = calculateEmployeeShiftsStatistic(employee.shifts, employee.hourlyRate, employee.hourlyRateOvertime);
    expect(result).toEqual({
      totalClockedIn: 0,
      regularAmount: 0,
      overtimeAmount: 0
    });
  });

  it('should calculate shift statistics for an employee with one shift within the same day', () => {
    employee.shifts.set(new Date('2023-01-01').getTime(), [
      {
        id: '1',
        employeeId: '1',
        clockIn: new Date(1704096000000), // '2023-01-01T08:00:00'
        clockOut: new Date(1704124800000) // '2023-01-01T16:00:00'
      }
    ]);

    const result = calculateEmployeeShiftsStatistic(employee.shifts, employee.hourlyRate, employee.hourlyRateOvertime);
    expect(result).toEqual({
      totalClockedIn: 8 * 60 * 60 * 1000,
      regularAmount: 8 * employee.hourlyRate,
      overtimeAmount: 0
    });
  });

  it('should calculate shift statistics for an employee with overtime', () => {
    employee.shifts.set(new Date('2023-01-01T06:00:00').getTime(), [
      {
        id: '1',
        employeeId: '1',
        clockIn: new Date(1704088800000), // '2023-01-01T06:00:00',
        clockOut: new Date(1704132000000) // '2023-01-02T18:00:00'
      }
    ]);

    const result = calculateEmployeeShiftsStatistic(employee.shifts, employee.hourlyRate, employee.hourlyRateOvertime);
    expect(result).toEqual({
      totalClockedIn: 12 * 60 * 60 * 1000,
      regularAmount: 8 * employee.hourlyRate,
      overtimeAmount: 4 * employee.hourlyRateOvertime
    });
  });

  it('should calculate shift statistics for an employee with one shift spanning two days', () => {
    const clockIn = new Date(1704146400000); // '2023-01-01T22:00:00'
    const clockOut = new Date(1704175200000); // '2023-01-02T06:00:00'

    employee.shifts.set(new Date('2023-01-01').getTime(), [
      {
        id: '1',
        employeeId: '1',
        clockIn: clockIn,
        clockOut: clockOut
      }
    ]);

    const endDateTimestamp = getEndDayDateTimestamp(new Date(clockIn));
    const clockedInForThisDay = endDateTimestamp - clockIn.getTime();

    const startDateTimestamp = getStartDayDateTimestamp(new Date(clockOut));
    const clockedInForNextDay = clockOut.getTime() - startDateTimestamp;

    const result = calculateEmployeeShiftsStatistic(employee.shifts, employee.hourlyRate, employee.hourlyRateOvertime);
    expect(result).toEqual({
      totalClockedIn: clockedInForThisDay + clockedInForNextDay,
      regularAmount:
        (getHoursFromTimestamp(clockedInForThisDay) + getHoursFromTimestamp(clockedInForNextDay)) * employee.hourlyRate,
      overtimeAmount: 0
    });
  });

  it('should calculate shift statistics for an employee with multiple shifts', () => {
    employee.shifts.set(new Date('2023-01-01').getTime(), [
      {
        id: '1',
        employeeId: '1',
        clockIn: new Date('2023-01-01T08:00:00'),
        clockOut: new Date('2023-01-01T16:00:00')
      }
    ]);
    employee.shifts.set(new Date('2023-01-02').getTime(), [
      {
        id: '2',
        employeeId: '1',
        clockIn: new Date('2023-01-02T22:00:00'),
        clockOut: new Date('2023-01-03T06:00:00')
      }
    ]);

    const startDateTimestamp = getStartDayDateTimestamp(new Date('2023-01-03T06:00:00'));
    const clockedInForNextDay = new Date('2023-01-03T06:00:00').getTime() - startDateTimestamp;

    const endDateTimestamp = getEndDayDateTimestamp(new Date('2023-01-02T22:00:00'));
    const clockedInForThisDay = endDateTimestamp - new Date('2023-01-02T22:00:00').getTime();
    const totalClockedIn = 8 + getHoursFromTimestamp(clockedInForThisDay) + getHoursFromTimestamp(clockedInForNextDay);

    const result = calculateEmployeeShiftsStatistic(employee.shifts, employee.hourlyRate, employee.hourlyRateOvertime);

    expect(result).toEqual({
      totalClockedIn: totalClockedIn * 60 * 60 * 1000,
      regularAmount: 16 * employee.hourlyRate,
      overtimeAmount: 0
    });
  });

  it('should calculate shift statistics for an employee with multiple shifts and overtime', () => {
    // Add multiple shifts to the employee, ensuring that at least one of the shifts has overtime
    employee.shifts.set(new Date('2023-01-01').getTime(), [
      {
        id: '1',
        employeeId: '1',
        clockIn: new Date('2023-01-01T08:00:00'),
        clockOut: new Date('2023-01-01T18:00:00') // 2 hours of overtime
      }
    ]);

    employee.shifts.set(new Date('2023-01-02').getTime(), [
      {
        id: '2',
        employeeId: '1',
        clockIn: new Date('2023-01-02T08:00:00'),
        clockOut: new Date('2023-01-02T16:00:00')
      }
    ]);

    // Calculate the expected total clocked in time, regular amount, and overtime amount
    const totalClockedIn = (10 + 8) * 60 * 60 * 1000; // 10 hours for the first shift and 8 hours for the second shift
    const regularAmount = 16 * employee.hourlyRate; // 8 hours for each shift
    const overtimeAmount = 2 * employee.hourlyRateOvertime; // 2 hours of overtime in the first shift

    // Call the calculateEmployeeStatistic function with the employee data
    const result = calculateEmployeeShiftsStatistic(employee.shifts, employee.hourlyRate, employee.hourlyRateOvertime);

    expect(result).toEqual({
      totalClockedIn: totalClockedIn,
      regularAmount: regularAmount,
      overtimeAmount: overtimeAmount
    });
  });
});
