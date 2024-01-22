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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statistic']) {
      console.log('statistic', new Date(this.statistic.totalClockedIn));
    }
  }
}
