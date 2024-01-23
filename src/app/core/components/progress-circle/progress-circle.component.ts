import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [DecimalPipe, MatProgressSpinner],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressCircleComponent {
  @Input({ required: true }) percentage!: number;
}
