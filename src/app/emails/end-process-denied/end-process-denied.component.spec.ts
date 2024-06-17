import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProcessDeniedComponent } from './end-process-denied.component';

describe('EndProcessDeniedComponent', () => {
  let component: EndProcessDeniedComponent;
  let fixture: ComponentFixture<EndProcessDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndProcessDeniedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndProcessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
