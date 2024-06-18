import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDataDeniedComponent } from './verify-data-denied.component';

describe('VerifyDataDeniedComponent', () => {
  let component: VerifyDataDeniedComponent;
  let fixture: ComponentFixture<VerifyDataDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyDataDeniedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDataDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
