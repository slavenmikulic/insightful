export interface IDashboardStatistic {
  totalEmployees: number;
  totalClockedIn: number;
  regularAmount: number;
  overtimeAmount: number;
}

export type IDashboardEmployeeStatistic = Omit<IDashboardStatistic, 'totalEmployees'>;
