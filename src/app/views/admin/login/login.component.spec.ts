import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from '../../../services/login/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginService = jasmine.createSpyObj('LoginService', ['loginUser']);
    const router = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [LoginComponent],  // Importa el componente standalone aquí
      providers: [
        FormBuilder,
        { provide: LoginService, useValue: loginService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges(); // Dispara ngOnInit
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('debería cambiar el estado de hidePassword al invocar togglePasswordVisibility', () => {
    const initialHidePassword = component.hidePassword;
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBe(!initialHidePassword);
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido al hacer submit', () => {
    component.onSubmit();
    expect(component.loginForm.touched).toBeTrue();
    expect(component.loginForm.controls['username'].touched).toBeTrue();
    expect(component.loginForm.controls['password'].touched).toBeTrue();
  });

});
