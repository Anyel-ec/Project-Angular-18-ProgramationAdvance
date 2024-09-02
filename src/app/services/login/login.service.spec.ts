import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should return user data on successful login', () => {
    const credentials = { username: 'testuser', password: 'testpass' };
    const dummyResponse = { data: { token: 'abc123' } };

    service.loginUser(credentials).subscribe(data => {
      expect(data).toEqual(dummyResponse.data);
    });

    const req = httpMock.expectOne('http://34.127.73.228:3001/api/users/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(dummyResponse);
  });

  it('should handle errors', () => {
    const credentials = { username: 'testuser', password: 'testpass' };
    const errorMessage = 'Error occurred';
  
    service.loginUser(credentials).subscribe(
      () => fail('expected an error, not user data'),
      (error: string) => {
        // Asegúrate de que el error recibido contenga el mensaje esperado
        expect(error).toContain('Error Code: 500');
        expect(error).toContain('Message: Http failure response for http://34.127.73.228:3001/api/users/login: 500 Server Error');
      }
    );
  
    const req = httpMock.expectOne('http://34.127.73.228:3001/api/users/login');
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
  
  
});
