import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IEmployee } from '../../../core/employee/intefaces/employee.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { EmployeesEditDialogComponent } from '../../../employees-edit-dialog/components/employees-edit-dialog/employees-edit-dialog.component';
import { filter } from 'rxjs';
import { IEmployeeEditForm } from '../../../employees-edit-dialog/interfaces/employee-edit-form.interface';
import { FormArray, FormGroup } from '@angular/forms';

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
    this.dialog
      .open(EmployeesEditDialogComponent, {
        data: this.selection.selected
      })
      .afterClosed()
      .pipe(filter((data): data is FormGroup<IEmployeeEditForm> => !!data))
      .subscribe(data => {});
  }
}
