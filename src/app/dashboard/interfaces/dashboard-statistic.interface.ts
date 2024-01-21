import { IEmployeeStatistic } from '../../core/employee/intefaces/employee-statistic.interface';

export interface IDashboardStatistic extends IEmployeeStatistic {
  totalEmployees: number;
}
