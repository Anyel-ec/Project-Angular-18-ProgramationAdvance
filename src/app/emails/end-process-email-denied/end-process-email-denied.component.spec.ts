import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProcessEmailDeniedComponent } from './end-process-email-denied.component';

describe('EndProcessEmailDeniedComponent', () => {
  let component: EndProcessEmailDeniedComponent;
  let fixture: ComponentFixture<EndProcessEmailDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndProcessEmailDeniedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndProcessEmailDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
