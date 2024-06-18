import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormEmailComponent } from './registration-form-email.component';

describe('RegistrationFormEmailComponent', () => {
  let component: RegistrationFormEmailComponent;
  let fixture: ComponentFixture<RegistrationFormEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFormEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
