import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Importa NO_ERRORS_SCHEMA para ignorar errores de los componentes no declarados

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
      schemas: [NO_ERRORS_SCHEMA] // Ignora los errores de los componentes no declarados
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
    component.isAdmin = false; // Asegúrate de que isAdmin esté configurado como false
    testRouteVisibility('/login');
  });

  it('should hide header and footer on error-404 route', () => {
    component.isAdmin = false; // Asegúrate de que isAdmin esté configurado como false
    testRouteVisibility('/error-404');
  });

  it('should show header and footer on other routes', () => {
    component.isAdmin = false; // Asegúrate de que isAdmin esté configurado como false
    testRouteVisibility('/some-other-route', true);
  });

  it('should show admin nav if user is admin', () => {
    component.isAdmin = true; // Configura isAdmin como true
    eventsSubject.next(new NavigationEnd(1, '/some-route', '/some-route'));
    fixture.detectChanges();
    expect(component.showHeader).toBeTrue();
    expect(component.showFooter).toBeTrue();
    // Verifica si el componente de navegación del administrador se muestra
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-nav-admin')).toBeTruthy();
    expect(compiled.querySelector('app-nav')).toBeFalsy();
  });

  function testRouteVisibility(route: string, expectHeaderAndFooter = false) {
    eventsSubject.next(new NavigationEnd(1, route, route));
    fixture.detectChanges();
    expect(component.showHeader).toBe(expectHeaderAndFooter);
    expect(component.showFooter).toBe(expectHeaderAndFooter);
  }
});
