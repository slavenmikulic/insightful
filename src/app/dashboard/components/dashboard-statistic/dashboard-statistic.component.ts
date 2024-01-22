import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDashboardStatistic } from '../../interfaces/dashboard-statistic.interface';

@Component({
  selector: 'app-dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrl: './dashboard-statistic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStatisticComponent {
  @Input({ required: true }) statistic!: IDashboardStatistic;
}
