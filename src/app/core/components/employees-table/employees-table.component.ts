import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TableVirtualScrollDataSource, TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { IEmployee } from '../../employee/intefaces/employee.interface';
import { IShift } from '../../shift/shift.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesEditDialogComponent } from '../../../employees-edit-dialog/components/employees-edit-dialog/employees-edit-dialog.component';
import { filter } from 'rxjs';
import { EmployeesEditDialogModule } from '../../../employees-edit-dialog/employees-edit-dialog.module';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [
    CdkVirtualScrollViewport,
    CurrencyPipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    TableVirtualScrollModule,
    TimeFormatPipe,
    MatHeaderCellDef,
    EmployeesEditDialogModule
  ],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnChanges {
  @Input({ required: true }) employees!: IEmployee[];
  @Output() updateEmployees = new EventEmitter<{ employees: IEmployee[]; shifts: IShift[] }>();

  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = sort;
    }
  }

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
      .pipe(filter((data): data is { employees: IEmployee[]; shifts: IShift[] } => !!data))
      .subscribe(data => this.updateEmployees.emit(data));
  }
}
