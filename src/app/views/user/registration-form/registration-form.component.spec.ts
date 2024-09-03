import { TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { LoadDataService } from '../../../services/loadDataRegister/load-data.service';
import { RegisterService } from '../../../services/register/register.service';
import { FormBuilder } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

describe('RegistrationFormComponent additional tests', () => {
  let loadDataService: LoadDataService;
  let registerService: RegisterService;
  let component: RegistrationFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadDataService,
        RegisterService,
        { provide: HttpClient, useValue: {} }, // Proporciona un mock de HttpClient
        provideHttpClientTesting()
      ],
    });

    loadDataService = TestBed.inject(LoadDataService);
    registerService = TestBed.inject(RegisterService);
    component = new RegistrationFormComponent(new FormBuilder(), loadDataService, registerService);
  });

  describe('ngOnInit method calls', () => {
    it('should call loadProvinces on ngOnInit', () => {
      const loadProvincesSpy = spyOn(component, 'loadProvinces').and.callThrough();
      component.ngOnInit();
      expect(loadProvincesSpy).toHaveBeenCalled();
    });

    it('should call loadGenders on ngOnInit', () => {
      const loadGendersSpy = spyOn(component, 'loadGenders').and.callThrough();
      component.ngOnInit();
      expect(loadGendersSpy).toHaveBeenCalled();
    });

    it('should call loadCommandTypes on ngOnInit', () => {
      const loadCommandTypesSpy = spyOn(component, 'loadCommandTypes').and.callThrough();
      component.ngOnInit();
      expect(loadCommandTypesSpy).toHaveBeenCalled();
    });
  });

  describe('RegistrationFormComponent - loadGenders', () => {
    it('should load genders on initialization', () => {
      const mockGenders = [{ _id: '1', name: 'Masculino' }];
      spyOn(loadDataService, 'getGender').and.returnValue(of({ data: mockGenders }));
      component.loadGenders();
      expect(component.genders).toEqual(mockGenders);
    });

    it('should handle error when loading genders fails', () => {
      spyOn(loadDataService, 'getGender').and.returnValue(throwError(() => new Error('Error')));
      const consoleSpy = spyOn(console, 'error');
      component.loadGenders();
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching genders:', 'Error');
    });
  });

  describe('RegistrationFormComponent - validarEdad', () => {
    it('should return edadInvalida when the control value is not a valid date', () => {
      const control = new FormControl('invalid-date'); // Usamos un valor que no es una fecha válida.
      const result = component.validarEdad(18, 50)(control);
      expect(result).toEqual({ edadInvalida: true });
    });

    it('should return edadInvalida when control value is empty', () => {
      const control = new FormControl(''); // Usamos un valor vacío para provocar el error.
      const result = component.validarEdad(18, 50)(control);
      expect(result).toEqual({ edadInvalida: true });
    });

    it('should return null when the age is within the valid range', () => {
      const control = new FormControl('2000-01-01'); // Fecha válida que está dentro del rango.
      const result = component.validarEdad(18, 50)(control);
      expect(result).toBeNull();
    });

    it('should return edadInvalida when the age is outside the valid range', () => {
      const control = new FormControl('2010-01-01'); // Fecha que está fuera del rango permitido.
      const result = component.validarEdad(18, 50)(control);
      expect(result).toEqual({ edadInvalida: true });
    });
  });

  describe('RegistrationFormComponent - loadCommandTypes', () => {
    it('should load command types on initialization', () => {
      const mockCommandTypes = [{ _id: '1', name: 'Infantería' }];
      spyOn(loadDataService, 'getCommandType').and.returnValue(of({ data: mockCommandTypes }));
      component.loadCommandTypes();
      expect(component.commandTypes).toEqual(mockCommandTypes);
    });

    it('should handle error when loading command types fails', () => {
      spyOn(loadDataService, 'getCommandType').and.returnValue(throwError(() => new Error('Error')));
      const consoleSpy = spyOn(console, 'error');
      component.loadCommandTypes();
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching command types:', 'Error');
    });
  });

  it('should return error when getError is called and control has the error', () => {
    const controlName = 'name';
    const errorType = 'required';
    component.form.controls[controlName] = new FormControl('', [Validators.required]);
    component.form.controls[controlName].markAsTouched();
    const result = component.getError(controlName, errorType);
    expect(result).toBeTrue();
  });

  it('should return false when getError is called and control does not have the error', () => {
    const controlName = 'name';
    const errorType = 'required';
    component.form.controls[controlName] = new FormControl('John Doe', [Validators.required]);
    const result = component.getError(controlName, errorType);
    expect(result).toBeFalse();
  });

  it('should return true when isInvalid is called and control is invalid and touched', () => {
    const controlName = 'name';
    component.form.controls[controlName] = new FormControl('', [Validators.required]);
    component.form.controls[controlName].markAsTouched();
    const result = component.isInvalid(controlName);
    expect(result).toBeTrue();
  });

  it('should return false when isInvalid is called and control is valid or not touched', () => {
    const controlName = 'name';
    component.form.controls[controlName] = new FormControl('John Doe', [Validators.required]);
    const result = component.isInvalid(controlName);
    expect(result).toBeFalse();
  });

  it('should return true when isValid is called and control is valid and touched', () => {
    const controlName = 'name';
    component.form.controls[controlName] = new FormControl('John Doe', [Validators.required]);
    component.form.controls[controlName].markAsTouched();
    const result = component.isValid(controlName);
    expect(result).toBeTrue();
  });

  it('should return false when isValid is called and control is invalid or not touched', () => {
    const controlName = 'name';
    component.form.controls[controlName] = new FormControl('', [Validators.required]);
    const result = component.isValid(controlName);
    expect(result).toBeFalse();
  });

  it('should mark control as touched when markAsTouched is called', () => {
    const controlName = 'name';
    component.form.controls[controlName] = new FormControl('');
    component.markAsTouched(controlName);
    expect(component.form.controls[controlName].touched).toBeTrue();
  });

  it('should filter only numbers when filterOnlyNumbers is called', () => {
    const event = { target: { value: 'abc123' } } as unknown as Event;
    component.filterOnlyNumbers(event);
    expect((event.target as HTMLInputElement).value).toBe('123');
  });

  it('should filter only letters when filterOnlyLetters is called', () => {
    const event = { target: { value: 'abc123' } } as unknown as Event;
    component.filterOnlyLetters(event);
    expect((event.target as HTMLInputElement).value).toBe('abc');
  });

  describe('RegistrationFormComponent - validarCedulaEcuatoriana', () => {
    it('should return null if the cedula is valid', () => {
      const control = new FormControl('1717485639');
      const result = component.validarCedulaEcuatoriana(control);
      expect(result).toBeNull();
    });

    it('should return cedulaInvalida error if the cedula is invalid', () => {
      const control = new FormControl('0000000000');
      const result = component.validarCedulaEcuatoriana(control);
      expect(result).toEqual({ cedulaInvalida: true });
    });

    it('should return null when digitoVerificador equals ultimoDigito', () => {
      const control = new FormControl('2300287246');
      const result = component.validarCedulaEcuatoriana(control);
      expect(result).toBeNull();
    });

    it('should return cedulaInvalida error when digitoVerificador does not match ultimoDigito', () => {
      const control = new FormControl('1717485638');
      const result = component.validarCedulaEcuatoriana(control);
      expect(result).toEqual({ cedulaInvalida: true });
    });

    it('should return cedulaInvalida error when the cedula length is not 10', () => {
      const control = new FormControl('123456789'); // Cédula con menos de 10 dígitos
      const result = component.validarCedulaEcuatoriana(control);
      expect(result).toEqual({ cedulaInvalida: true });
    });

    it('should return cedulaInvalida error when the digitoRegion is not between 1 and 24', () => {
      const control = new FormControl('0012345678'); // Cédula con digitoRegion fuera del rango (00)
      const result = component.validarCedulaEcuatoriana(control);
      expect(result).toEqual({ cedulaInvalida: true });

      const control2 = new FormControl('2512345678'); // Cédula con digitoRegion fuera del rango (25)
      const result2 = component.validarCedulaEcuatoriana(control2);
      expect(result2).toEqual({ cedulaInvalida: true });
    });
  });

  describe('RegistrationFormComponent - validarNumeroCelular', () => {
    it('should return null when the control value is empty', () => {
      const control = new FormControl(''); // Valor vacío para simular un teléfono no ingresado
      const result = component.validarNumeroCelular(control);
      expect(result).toBeNull();
    });

    it('should return telefonoInvalido error when the telefono length is not 10', () => {
      const control = new FormControl('123456789'); // Número con menos de 10 dígitos
      const result = component.validarNumeroCelular(control);
      expect(result).toEqual({ telefonoInvalido: true });
    });

    it('should return telefonoInvalido error when the primerosDigitos are not 09 or 08', () => {
      const control = new FormControl('0712345678'); // Número con primeros dígitos inválidos
      const result = component.validarNumeroCelular(control);
      expect(result).toEqual({ telefonoInvalido: true });
    });

    it('should return null when the telefono is valid', () => {
      const control = new FormControl('0987654321'); // Número de teléfono válido
      const result = component.validarNumeroCelular(control);
      expect(result).toBeNull();
    });
  });

  describe('RegistrationFormComponent - validarCorreoElectronico', () => {
    it('should return null for a valid email address', () => {
      const control = new FormControl('test@example.com'); // Email válido
      const result = component.validarCorreoElectronico(control);
      expect(result).toBeNull();
    });

    it('should return correoInvalido error for an invalid email address', () => {
      const control = new FormControl('invalid-email'); // Email inválido (sin @)
      const result = component.validarCorreoElectronico(control);
      expect(result).toEqual({ correoInvalido: true });
    });

    it('should return correoInvalido error for an email missing domain', () => {
      const control = new FormControl('test@.com'); // Email inválido (falta el dominio)
      const result = component.validarCorreoElectronico(control);
      expect(result).toEqual({ correoInvalido: true });
    });

    it('should return null for an empty email', () => {
      const control = new FormControl(''); // Email vacío
      const result = component.validarCorreoElectronico(control);
      expect(result).toBeNull();
    });
  });

  describe('RegistrationFormComponent - validarNotaGrado', () => {
    it('should return null for a valid grade (between 0 and 20)', () => {
      const control = new FormControl(15); // Nota válida
      const result = component.validarNotaGrado(control);
      expect(result).toBeNull();
    });

    it('should return notaGradoInvalida error for a grade less than 0', () => {
      const control = new FormControl(-1); // Nota menor a 0
      const result = component.validarNotaGrado(control);
      expect(result).toEqual({ notaGradoInvalida: true });
    });

    it('should return notaGradoInvalida error for a grade greater than 20', () => {
      const control = new FormControl(21); // Nota mayor a 20
      const result = component.validarNotaGrado(control);
      expect(result).toEqual({ notaGradoInvalida: true });
    });

    it('should return null for an empty grade', () => {
      const control = new FormControl(''); // Nota vacía
      const result = component.validarNotaGrado(control);
      expect(result).toBeNull();
    });

    it('should return null for a null grade', () => {
      const control = new FormControl(null); // Nota nula
      const result = component.validarNotaGrado(control);
      expect(result).toBeNull();
    });
  });

  describe('RegistrationFormComponent - validarNombreCompleto', () => {
    it('should return null for a valid name', () => {
      const control = new FormControl('Juan Pérez');
      const result = component.validarNombreCompleto(control);
      expect(result).toBeNull();
    });

    it('should return null when name is null', () => {
      const control = new FormControl(null);
      const result = component.validarNombreCompleto(control);
      expect(result).toBeNull();
    });

    it('should return null when cedula is "0000000000"', () => {
      const control = new FormControl('0000000000');
      const result = component.validarNombreCompleto(control);
      expect(result).toBeNull();
    });

    it('should return nombreInvalido error when name length is less than 3', () => {
      const control = new FormControl('Ju');
      const result = component.validarNombreCompleto(control);
      expect(result).toEqual({ nombreInvalido: true });
    });

    it('should return nombreInvalido error when name does not match the regular expression', () => {
      const control = new FormControl('Juan123');
      const result = component.validarNombreCompleto(control);
      expect(result).toEqual({ nombreInvalido: true });
    });
  });

  describe('RegistrationFormComponent - loadProvinces', () => {
    it('should load provinces on initialization', () => {
      const mockProvinces = [{ _id: '1', name: 'Pichincha' }];
      spyOn(loadDataService, 'getProvinces').and.returnValue(of({ data: mockProvinces }));
      component.loadProvinces();
      expect(component.provinces).toEqual(mockProvinces);
    });

    it('should handle error when loading provinces fails', () => {
      spyOn(loadDataService, 'getProvinces').and.returnValue(throwError(() => new Error('Error')));
      const consoleSpy = spyOn(console, 'error');
      component.loadProvinces();
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching provinces:', 'Error');
    });
  });

  describe('RegistrationFormComponent - save method', () => {
    beforeEach(() => {
      // Configuración necesaria para los tests
      component.form = component.formBuilder.group({
        id_gender: new FormControl('1'),
        id_province: new FormControl('1'),
        id_commandType: new FormControl('1'),
        gradeNote: new FormControl(15),
        // Otros campos necesarios para el formulario
      });
    });

    it('should call preventDefault and saveRegister when form is valid and gradeNote >= 14', () => {
      spyOn(component, 'saveRegister').and.callThrough();
      const event = jasmine.createSpyObj('event', ['preventDefault']);
      component.save(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.saveRegister).toHaveBeenCalled();
    });

    it('should display a warning when gradeNote < 14', () => {
      spyOn(Swal, 'fire');
      // Configura el valor de gradeNote en el formulario
      component.form.get('gradeNote')!.setValue(13); // Nota menor que 14
      // Llama al método que debería disparar la advertencia
      const event = jasmine.createSpyObj('event', ['preventDefault']);
      component.save(event);
      // Verifica que Swal.fire ha sido llamado con los parámetros esperados
      expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
        icon: 'warning',
        title: 'Nota Baja',
        text: 'La nota de grado es menor a 14. Los aspirantes deben tener un mínimo de 14 puntos para postularse.',
        confirmButtonText: 'Aceptar',
      }));
    });

    it('should mark all fields as touched when form is invalid', () => {
      component.form.get('id_gender')!.setValue(''); // Hacemos que el formulario sea inválido
      spyOn(component.form, 'markAllAsTouched');
      const event = jasmine.createSpyObj('event', ['preventDefault']);
      component.save(event);
      expect(component.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('should mark all fields as touched when form is invalid', () => {
      // Establece un valor que hace que el formulario sea inválido
      component.form.get('id_gender')!.setValue(''); // Hacemos que el formulario sea inválido

      // Espía en el método markAllAsTouched para verificar si se llama
      spyOn(component.form, 'markAllAsTouched');

      // Crea un objeto de evento espía
      const event = jasmine.createSpyObj('event', ['preventDefault']);

      // Llama al método que debería marcar todos los campos como tocados
      component.save(event);

      // Verifica que markAllAsTouched ha sido llamado
      expect(component.form.markAllAsTouched).toHaveBeenCalled();
    });
  });

  it('should show a success alert and reset the form when the register is successfully saved', () => {
    const mockData = { message: 'Success' };
    spyOn(component['registerService'], 'createOrUpdateRegister').and.returnValue(of(mockData));
    const swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    spyOn(component.form, 'reset');
    component.saveRegister({});
    expect(swalSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'success',
      title: 'Formulario Enviado',
      text: 'El formulario se ha enviado con éxito.',
      confirmButtonText: 'Aceptar',
    }));
    expect(component.form.reset).toHaveBeenCalled();
  });

  it('should show an error alert when the register fails to save', () => {
    const mockError = 'Error';
    spyOn(component['registerService'], 'createOrUpdateRegister').and.returnValue(throwError(() => new Error(mockError)));
    const consoleSpy = spyOn(console, 'error');
    const swalSpy = spyOn(Swal, 'fire');
    component.saveRegister({});
    expect(consoleSpy).toHaveBeenCalledWith('Error creating or updating register:', mockError);
    expect(swalSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo.',
      confirmButtonText: 'Aceptar',
    }));
  });

  describe('RegistrationFormComponent - resolved', () => {
    let component: RegistrationFormComponent;
    beforeEach(() => {
      component = new RegistrationFormComponent(new FormBuilder(), TestBed.inject(LoadDataService), TestBed.inject(RegisterService));
    });

    it('should set captchaValid to true when captchaResponse is a non-empty string', () => {
      component.resolved('valid-captcha-response');
      expect(component.captchaValid).toBeTrue();
    });

    it('should set captchaValid to false when captchaResponse is null', () => {
      component.resolved(null);
      expect(component.captchaValid).toBeFalse();
    });

    it('should set captchaValid to false when captchaResponse is an empty string', () => {
      component.resolved('');
      expect(component.captchaValid).toBeFalse();
    });
  });
});
