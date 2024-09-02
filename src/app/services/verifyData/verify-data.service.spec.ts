import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConfigService } from '../api-Config-Service';
import { VerifyDataService } from './verify-data.service';

describe('VerifyDataService', () => {
  let service: VerifyDataService;
  let httpMock: HttpTestingController;
  let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiConfigService', ['getBaseUrl']);
    spy.getBaseUrl.and.returnValue('http://34.127.73.228:3001/'); // Asegúrate de que es correcto

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VerifyDataService,
        { provide: ApiConfigService, useValue: spy }
      ]
    });

    service = TestBed.inject(VerifyDataService);
    httpMock = TestBed.inject(HttpTestingController);
    apiConfigServiceSpy = TestBed.inject(ApiConfigService) as jasmine.SpyObj<ApiConfigService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return expected data (HttpClient called once)', () => {
    const dummyData = [
      {
        _id: "66ae9abb746ae410645c17aa",
        identification: "2300415870",
        name: "David Lopez",
        gender: "Masculino",
        province: "Azuay",
        commandType: "Militar",
        state: "Aprobado"
      }
      // ...otros datos
    ];

    service.getRelationsVerifyData().subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://34.127.73.228:3001/api/verifyData');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should return response from deleteVerifyData', () => {
    const id = '123';
    const dummyResponse = { success: true };

    service.deleteVerifyData(id).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`http://34.127.73.228:3001/api/verifyData/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

  it('should return updated data from updateVerifyData', () => {
    const id = '123';
    const updatedData = {
      name: 'Updated Name'
    };
    const dummyResponse = { success: true };

    service.updateVerifyData(id, updatedData).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`http://34.127.73.228:3001/api/verifyData/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedData);
    req.flush(dummyResponse);
  });

});
