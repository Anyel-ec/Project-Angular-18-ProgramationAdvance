import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule
import { NavComponent } from './nav.component';
import { MenubarModule } from 'primeng/menubar'; // Asegúrate de importar cualquier módulo necesario

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Proporciona el módulo de enrutamiento
        MenubarModule, // Importa otros módulos necesarios
        NavComponent
      ]
    })
    .compileComponents();

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
