import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenubarModule } from 'primeng/menubar';
import { NavAdminComponent } from './nav-admin.component';
import { routes } from '../../app.routes';
import { provideRouter } from '@angular/router';

describe('NavAdminComponent', () => {
  let component: NavAdminComponent;
  let fixture: ComponentFixture<NavAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenubarModule, // Importa otros módulos necesarios
      ],
      providers: [
        provideRouter(routes), // Usa provideRouter con tus rutas
      ],
      declarations: [
        NavAdminComponent // Declara el componente aquí
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAdminComponent);
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
