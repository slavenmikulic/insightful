import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProgressCircleComponent } from './dashboard-progress-circle.component';

describe('DashboardProgressCircleComponent', () => {
  let component: DashboardProgressCircleComponent;
  let fixture: ComponentFixture<DashboardProgressCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardProgressCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProgressCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
