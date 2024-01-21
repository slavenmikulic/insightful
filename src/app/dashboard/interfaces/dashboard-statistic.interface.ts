export interface IDashboardStatistic {
  totalClockedIn: number;
  overtimeAmount: number;
  totalEmployees: number;
  regularAmount: number;
}

export type IDashboardEmployeeStatistic = Omit<IDashboardStatistic, 'totalEmployees'>;
