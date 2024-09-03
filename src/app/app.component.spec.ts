import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { of, Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let eventsSubject: Subject<NavigationEnd>;

  beforeEach(async () => {
    eventsSubject = new Subject<NavigationEnd>();

    // Crear un stub para el router
    const routerStub = {
      events: eventsSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent], // Usa 'declarations' para registrar el componente
      providers: [
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'project' title`, () => {
    expect(component.title).toEqual('project');
  });

  it('should hide header and footer on login route', () => {
    eventsSubject.next(new NavigationEnd(1, '/login', '/login'));
    fixture.detectChanges();
    expect(component.showHeader).toBeFalse();
    expect(component.showFooter).toBeFalse();
  });

  it('should hide header and footer on error-404 route', () => {
    eventsSubject.next(new NavigationEnd(1, '/error-404', '/error-404'));
    fixture.detectChanges();
    expect(component.showHeader).toBeFalse();
    expect(component.showFooter).toBeFalse();
  });

  it('should handle upload-receipt route correctly', () => {
    eventsSubject.next(new NavigationEnd(1, '/subir-recibo/123', '/subir-recibo/123'));
    fixture.detectChanges();
    expect(component.showHeader).toBeFalse();
    expect(component.showFooter).toBeFalse();
  });
});
