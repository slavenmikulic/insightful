import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTotalTimeComponent } from './shift-total-time.component';

describe('ShiftTotalTimeComponent', () => {
  let component: ShiftTotalTimeComponent;
  let fixture: ComponentFixture<ShiftTotalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftTotalTimeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftTotalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
