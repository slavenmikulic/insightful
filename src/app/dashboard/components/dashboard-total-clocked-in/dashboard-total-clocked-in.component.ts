import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-total-clocked-in',
  templateUrl: './dashboard-total-clocked-in.component.html',
  styleUrl: './dashboard-total-clocked-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTotalClockedInComponent {
  @Input({ required: true }) totalClockedInHours!: number;
}
