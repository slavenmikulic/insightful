import { IShift } from '../../shift/shift.interface';
import { IEmployeeStatistic } from './employee-statistic.interface';

export interface IEmployee extends IEmployeeStatistic {
  id: string;
  name: string;
  email: string;
  hourlyRate: number;
  hourlyRateOvertime: number;
  shifts: IEmployeeShifts;
}

export type IEmployeeShifts = Map<number, IShift[]>;
