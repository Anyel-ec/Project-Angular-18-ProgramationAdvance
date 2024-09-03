import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

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
    // Use variables for credentials and response data
    const testCredentials = { username: 'testuser', password: 'testpass' };
    const expectedResponse = { data: { token: 'abc123' } };

    // Subscribe to the loginUser observable
    service.loginUser(testCredentials).subscribe(data => {
      expect(data).toEqual(expectedResponse.data);
    });

    // Expect an HTTP request to be made
    const req = httpMock.expectOne('http://34.127.73.228:3001/api/users/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testCredentials);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    // Provide a mock response
    req.flush(expectedResponse);
  });

  it('should handle errors', () => {
    // Use variables for credentials and error message
    const testCredentials = { username: 'testuser', password: 'testpass' };
    const errorMessage = 'Error occurred';

    // Subscribe to the loginUser observable
    service.loginUser(testCredentials).subscribe({
      next: () => fail('expected an error, not user data'),
      error: (error: any) => {
        // Check the error message for the expected details
        expect(error.error).toContain('Error Code: 500');
        expect(error.error).toContain('Message: Http failure response for http://34.127.73.228:3001/api/users/login: 500 Server Error');
      }
    });

    // Expect an HTTP request to be made
    const req = httpMock.expectOne('http://34.127.73.228:3001/api/users/login');
    expect(req.request.method).toBe('POST');

    // Provide a mock error response
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
