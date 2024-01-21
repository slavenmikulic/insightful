import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeesTotalComponent } from './dashboard-employees-total.component';

describe('DashboardEmployeesTotalComponent', () => {
  let component: DashboardEmployeesTotalComponent;
  let fixture: ComponentFixture<DashboardEmployeesTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEmployeesTotalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEmployeesTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
