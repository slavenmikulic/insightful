import { IShift } from '../shift/shift.interface';

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  hourlyRate: number;
  hourlyRateOvertime: number;
  shifts: IEmployeeShifts;
}

export type IEmployeeShifts = Map<string, IShift[]>;
