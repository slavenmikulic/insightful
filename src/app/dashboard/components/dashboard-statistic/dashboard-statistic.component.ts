import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDashboardStatistic } from '../../interfaces/dashboard-statistic.interface';

@Component({
  selector: 'app-dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrl: './dashboard-statistic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStatisticComponent implements OnChanges {
  @Input({ required: true }) statistic!: IDashboardStatistic;

  percentageForTotalRegularAmount = 0;
  percentageForTotalOvertimeAmount = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statistic']) {
      this.percentageForTotalRegularAmount = this.calculatePercentageForRegularAmount();
      this.percentageForTotalOvertimeAmount = this.calculatePercentageForTotalOvertimeAmount();
    }
  }

  private calculatePercentageForRegularAmount(): number {
    return (this.statistic.regularAmount / (this.statistic.regularAmount + this.statistic.overtimeAmount)) * 100;
  }

  private calculatePercentageForTotalOvertimeAmount(): number {
    return (this.statistic.overtimeAmount / (this.statistic.regularAmount + this.statistic.overtimeAmount)) * 100;
  }
}
