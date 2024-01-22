import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IEmployee } from '../../../core/employee/intefaces/employee.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DashboardEmployeesEditDialogComponent } from '../../dashboard-employees-edit-dialog/components/dashboard-employees-edit-dialog/dashboard-employees-edit-dialog.component';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({
  selector: 'app-dashboard-employees-table',
  templateUrl: './dashboard-employees-table.component.html',
  styleUrl: './dashboard-employees-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEmployeesTableComponent implements OnChanges {
  @Input({ required: true }) employees!: IEmployee[];

  public displayedColumns = ['select', 'name', 'email', 'totalClockedIn', 'regularAmount', 'overtimeAmount'];
  public selection = new SelectionModel<IEmployee>(true, []);
  public dataSource!: TableVirtualScrollDataSource<IEmployee>;

  private dialog = inject(MatDialog);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employees']) {
      this.dataSource = new TableVirtualScrollDataSource<IEmployee>(this.employees);
      this.selection.clear();
    }
  }

  public onOpenDialog(): void {
    this.dialog.open(DashboardEmployeesEditDialogComponent, {
      data: this.selection.selected
    });
  }
}
