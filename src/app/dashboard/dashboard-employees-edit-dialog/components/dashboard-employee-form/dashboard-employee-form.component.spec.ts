import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeeFormComponent } from './dashboard-employee-form.component';

describe('DashboardEmployeeFormComponent', () => {
  let component: DashboardEmployeeFormComponent;
  let fixture: ComponentFixture<DashboardEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEmployeeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
