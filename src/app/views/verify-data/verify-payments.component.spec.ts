import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPaymentsComponent } from './verify-payments.component';

describe('VerifyPaymentsComponent', () => {
  let component: VerifyPaymentsComponent;
  let fixture: ComponentFixture<VerifyPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPaymentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
