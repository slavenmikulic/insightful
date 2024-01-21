import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-employees-total',
  templateUrl: './dashboard-employees-total.component.html',
  styleUrl: './dashboard-employees-total.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEmployeesTotalComponent {}
