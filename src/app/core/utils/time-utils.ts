export const getRegularHours = (hours: number): number => (hours <= 8 ? hours : 8);

export const getOvertimeHours = (hours: number): number => (hours > 8 ? hours - 8 : 0);

export const getHoursFromTimestamp = (timestamp: number): number => timestamp / 1000 / 60 / 60;

export const getEndDayDateTimestamp = (date: Date): number => getEndDayDate(date).getTime();

export const getStartDayDateTimestamp = (date: Date): number => getStartDayDate(date).getTime();

export const calculateClockOutForNextDay = (clockOut: Date): number =>
  clockOut.getTime() - getStartDayDateTimestamp(clockOut);

export const calculateClockInUntilEndOfDay = (clockIn: Date): number =>
  getEndDayDateTimestamp(clockIn) - clockIn.getTime();

export const getStartDayDate = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

export const getEndDayDate = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);
