import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  const TEST_USERNAME = 'testuser';
  const TEST_PASSWORD = 'testpass';
  const TEST_CREDENTIALS = { username: TEST_USERNAME, password: TEST_PASSWORD };
  const EXPECTED_RESPONSE = { data: { token: 'abc123' } };
  const ERROR_MESSAGE = 'Error occurred';
  const ERROR_RESPONSE = {
    error: 'Error Code: 500\nMessage: Http failure response for http://34.127.73.228:3001/api/users/login: 500 Server Error'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return user data on successful login', () => {
    // Llamar al método loginUser con las credenciales de prueba
    service.loginUser(TEST_CREDENTIALS).subscribe(data => {
      expect(data).toEqual(EXPECTED_RESPONSE.data);
    });

    // Esperar una solicitud HTTP POST a la URL de login
    const req = httpMock.expectOne('http://34.127.73.228:3001/api/users/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(TEST_CREDENTIALS);

    // Responder con el mock de respuesta
    req.flush(EXPECTED_RESPONSE);
  });

  it('should handle errors', () => {
    // Suscribirse al observable loginUser con las credenciales de prueba
    service.loginUser(TEST_CREDENTIALS).subscribe({
      next: () => fail('expected an error, not user data'),
      error: (error: any) => {
        // Verifica que el mensaje de error contenga los detalles esperados
        expect(error.error).toContain(ERROR_RESPONSE.error);
      }
    });
  
    // Simular la respuesta del servidor con un error 500
    const req = httpMock.expectOne('http://34.127.73.228:3001/api/users/login');
    expect(req.request.method).toBe('POST');
    req.flush(ERROR_MESSAGE, { status: 500, statusText: 'Server Error' });
  });  
});
