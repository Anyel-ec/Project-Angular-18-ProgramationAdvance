import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenubarModule } from 'primeng/menubar'; 
import { NavAdminComponent } from './nav-admin.component';
import { RouterTestingModule } from '@angular/router/testing'; 

describe('NavAdminComponent', () => {
  let component: NavAdminComponent;
  let fixture: ComponentFixture<NavAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Proporciona el módulo de enrutamiento
        MenubarModule, // Importa otros módulos necesarios
        NavAdminComponent
      ]
    })
    .compileComponents();

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
