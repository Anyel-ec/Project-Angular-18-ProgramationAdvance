import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProcessEmailSuccessComponent } from './end-process-email-success.component';

describe('EndProcessEmailSuccessComponent', () => {
  let component: EndProcessEmailSuccessComponent;
  let fixture: ComponentFixture<EndProcessEmailSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndProcessEmailSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndProcessEmailSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
