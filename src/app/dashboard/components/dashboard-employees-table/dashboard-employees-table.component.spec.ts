import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeesTableComponent } from './dashboard-employees-table.component';

describe('DashboardEmployeesTableComponent', () => {
  let component: DashboardEmployeesTableComponent;
  let fixture: ComponentFixture<DashboardEmployeesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEmployeesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEmployeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
