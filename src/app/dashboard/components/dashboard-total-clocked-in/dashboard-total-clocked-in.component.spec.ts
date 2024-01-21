import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalClockedInComponent } from './dashboard-total-clocked-in.component';

describe('DashboardTotalClockedInComponent', () => {
  let component: DashboardTotalClockedInComponent;
  let fixture: ComponentFixture<DashboardTotalClockedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTotalClockedInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTotalClockedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
