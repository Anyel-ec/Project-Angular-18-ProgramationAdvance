import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

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
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: routerStub }
      ],
      imports: [RouterTestingModule] // Agregar RouterTestingModule si necesitas configurar rutas
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'project' title`, () => {
    expect(component.title).toEqual('project');
  });

  it('should hide header and footer on login route', () => {
    testRouteVisibility('/login');
  });

  it('should hide header and footer on error-404 route', () => {
    testRouteVisibility('/error-404');
  });

  it('should handle upload-receipt route correctly', () => {
    testRouteVisibility('/subir-recibo/123');
  });

  function testRouteVisibility(route: string) {
    eventsSubject.next(new NavigationEnd(1, route, route));
    fixture.detectChanges();
    expect(component.showHeader).toBeFalse();
    expect(component.showFooter).toBeFalse();
  }
});
