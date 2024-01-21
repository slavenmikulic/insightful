import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEmployeeForm } from '../../interfaces/employee-form.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-employee-form',
  templateUrl: './dashboard-employee-form.component.html',
  styleUrl: './dashboard-employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEmployeeFormComponent {
  @Input({ required: true }) form!: FormGroup<IEmployeeForm>;
}
