import { ComponentFixture, TestBed } from '@angular/core/testing';
import { routes } from '../../app.routes';
import { provideRouter } from '@angular/router';
import { NavComponent } from './nav.component';
import { MenubarModule } from 'primeng/menubar'; // Asegúrate de importar cualquier módulo necesario
import { NavAdminComponent } from '../nav-admin/nav-admin.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenubarModule, // Importa otros módulos necesarios
      ],
      providers: [
        provideRouter(routes), // Usa provideRouter con tus rutas
      ],
      declarations: [
        NavComponent, // Declara el componente aquí
        NavAdminComponent // Añade NavAdminComponent si es necesario para la prueba
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isNavActive when toggleNav is called', () => {
    // Initial state should be false
    expect(component.isNavActive).toBeFalse();

    // Call the method
    component.toggleNav();

    // Expect the state to be true
    expect(component.isNavActive).toBeTrue();

    // Call the method again
    component.toggleNav();

    // Expect the state to be false again
    expect(component.isNavActive).toBeFalse();
  });
});
