import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeesEditDialogComponent } from './dashboard-employees-edit-dialog.component';

describe('DashboardEmployeesEditDialogComponent', () => {
  let component: DashboardEmployeesEditDialogComponent;
  let fixture: ComponentFixture<DashboardEmployeesEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEmployeesEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEmployeesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
