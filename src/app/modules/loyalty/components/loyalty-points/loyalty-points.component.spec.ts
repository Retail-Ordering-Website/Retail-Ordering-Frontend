import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyPointsComponent } from './loyalty-points.component';

describe('LoyaltyPointsComponent', () => {
  let component: LoyaltyPointsComponent;
  let fixture: ComponentFixture<LoyaltyPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltyPointsComponent]
    });
    fixture = TestBed.createComponent(LoyaltyPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
