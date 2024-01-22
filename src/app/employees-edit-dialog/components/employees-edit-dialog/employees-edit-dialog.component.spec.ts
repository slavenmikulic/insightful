import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEditDialogComponent } from './employees-edit-dialog.component';

describe('EmployeesEditDialogComponent', () => {
  let component: EmployeesEditDialogComponent;
  let fixture: ComponentFixture<EmployeesEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
