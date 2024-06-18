import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDataSuccessComponent } from './verify-data-success.component';

describe('VerifyDataSuccessComponent', () => {
  let component: VerifyDataSuccessComponent;
  let fixture: ComponentFixture<VerifyDataSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyDataSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDataSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
