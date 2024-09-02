import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://34.127.73.228:3001/api/registers';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all registers', () => {
    const mockResponse = [{ id: '1', name: 'John' }, { id: '2', name: 'Doe' }];

    service.getRegisters().subscribe((registers) => {
      expect(registers.length).toBe(2);
      expect(registers).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a register by ID', () => {
    const mockResponse = { id: '1', name: 'John' };

    service.getRegisterById('1').subscribe((register) => {
      expect(register).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a register by identification', () => {
    const mockResponse = { id: '1', identification: '12345678', name: 'John' };

    service.getRegisterByIdentification('12345678').subscribe((register) => {
      expect(register).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/identification/12345678`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create or update a register', () => {
    const mockResponse = { success: true };
    const mockData = { name: 'John' };

    service.createOrUpdateRegister(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update a register by ID', () => {
    const mockResponse = { success: true };
    const mockData = { name: 'John' };

    service.updateRegister('1', mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should update a register by identification', () => {
    const mockResponse = { success: true };
    const mockData = { name: 'John' };

    service.updateRegisterByIdentification('12345678', mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/identification/12345678`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete a register by ID', () => {
    const mockResponse = { success: true };

    service.deleteRegister('1').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
