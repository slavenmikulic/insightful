import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeeShiftsFormComponent } from './dashboard-employee-shifts-form.component';

describe('DashboardEmployeeShiftsFormComponent', () => {
  let component: DashboardEmployeeShiftsFormComponent;
  let fixture: ComponentFixture<DashboardEmployeeShiftsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEmployeeShiftsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEmployeeShiftsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
