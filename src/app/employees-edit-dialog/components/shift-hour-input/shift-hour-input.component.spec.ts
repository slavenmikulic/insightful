import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftHourInputComponent } from './shift-hour-input.component';

describe('ShiftHourInputComponent', () => {
  let component: ShiftHourInputComponent;
  let fixture: ComponentFixture<ShiftHourInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftHourInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftHourInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
