import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
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

  it('debería llamar a loginUser y redirigir al usuario si el formulario es válido y la respuesta es exitosa', () => {
    const mockResponse = { token: 'fake-token' };
    loginServiceSpy.loginUser.and.returnValue(of(mockResponse));
    spyOn(console, 'log');
    spyOn(routerSpy, 'navigate');

    component.loginForm.setValue({ username: 'testuser', password: 'testpass' });
    component.onSubmit();

    expect(loginServiceSpy.loginUser).toHaveBeenCalledWith({ usernameOrEmail: 'testuser', password: 'testpass' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/verificar-registros']);
    expect(console.log).toHaveBeenCalledWith('testuser', 'testpass', "Proyecto");
  });

  it('debería mostrar un error y resetear el formulario si loginUser falla', () => {
    const errorResponse = new Error('Login failed');
    loginServiceSpy.loginUser.and.returnValue(throwError(() => errorResponse));

    spyOn(Swal, 'fire').and.callFake(() => {
      return Promise.resolve({
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      });
    });

    component.loginForm.setValue({ username: 'testuser', password: 'testpass' });
    component.onSubmit();

    const expectedSwalOptions = {
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'Los datos ingresados no son correctos'
    };

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining(expectedSwalOptions));
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

});
