import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoadDataService } from './load-data.service';

describe('LoadDataService', () => {
  let service: LoadDataService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://34.127.73.228:3001/api/load';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadDataService]
    });

    service = TestBed.inject(LoadDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes
    httpTestingController.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver las provincias', () => {
    const mockProvinces = ['Province1', 'Province2'];

    service.getProvinces().subscribe(provinces => {
      expect(provinces).toEqual(mockProvinces);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/province`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProvinces);
  });

  it('debería devolver los géneros', () => {
    const mockGenders = ['Male', 'Female'];

    service.getGender().subscribe(genders => {
      expect(genders).toEqual(mockGenders);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/gender`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockGenders);
  });

  it('debería devolver los tipos de comando', () => {
    const mockCommandTypes = ['Command1', 'Command2'];

    service.getCommandType().subscribe(commandTypes => {
      expect(commandTypes).toEqual(mockCommandTypes);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/command`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCommandTypes);
  });
});
