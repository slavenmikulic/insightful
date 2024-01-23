import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-progress-circle',
  templateUrl: './dashboard-progress-circle.component.html',
  styleUrl: './dashboard-progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProgressCircleComponent {
  @Input({ required: true }) percentage = 0;
}
