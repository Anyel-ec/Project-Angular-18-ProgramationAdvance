import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConfigService } from '../api-Config-Service';
import { VerifyDocumentService } from './verify-document.service';

describe('VerifyDocumentService', () => {
  let service: VerifyDocumentService;
  let httpMock: HttpTestingController;
  let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiConfigService', ['getBaseUrl']);
    spy.getBaseUrl.and.returnValue('http://34.127.73.228:3001/'); // URL base de prueba

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VerifyDocumentService,
        { provide: ApiConfigService, useValue: spy }
      ]
    });

    service = TestBed.inject(VerifyDocumentService);
    httpMock = TestBed.inject(HttpTestingController);
    apiConfigServiceSpy = TestBed.inject(ApiConfigService) as jasmine.SpyObj<ApiConfigService>;
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should return expected data from getRelationsVerifyDocument', () => {
    const dummyData = [
      {
        _id: "123",
        documentName: "Document1",
        status: "Verified"
      }
      // Agrega más datos si es necesario
    ];

    service.getRelationsVerifyDocument().subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://34.127.73.228:3001/api/verifyDocument');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
  it('should return updated data from updateVerifyDocument', () => {
    const id = '123';
    const updatedData = { status: 'Updated' };
    const dummyResponse = { success: true };

    service.updateVerifyDocument(id, updatedData).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`http://34.127.73.228:3001/api/verifyDocument/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedData);
    req.flush(dummyResponse);
  });

  it('should return response from deleteVerifyDocument', () => {
    const id = '123';
    const dummyResponse = { success: true };

    service.deleteVerifyDocument(id).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`http://34.127.73.228:3001/api/verifyDocument/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

});