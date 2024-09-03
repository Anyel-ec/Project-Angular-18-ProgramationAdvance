import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiConfigService } from '../api-Config-Service';
import { UploadDocumentService } from './upload-document.service';

describe('UploadDocumentService', () => {
  let service: UploadDocumentService;
  let httpMock: HttpTestingController;
  let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiConfigService', ['getBaseUrl']);
    spy.getBaseUrl.and.returnValue('http://34.127.73.228:3001/'); // URL base de prueba

    TestBed.configureTestingModule({
      providers: [
        UploadDocumentService,
        { provide: ApiConfigService, useValue: spy },
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UploadDocumentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should send a PUT request with FormData for updateVerifyDocument', () => {
    const id = '123';
    const document = new File(['dummy content'], 'test-file.txt', { type: 'text/plain' });
    const dummyResponse = { success: true };

    service.updateVerifyDocument(id, document).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`http://34.127.73.228:3001/api/uploadDocument/${id}`);
    expect(req.request.method).toBe('PUT');

    // Verifica que el body de la solicitud es de tipo FormData
    const formData = req.request.body as FormData;
    expect(formData.has('document')).toBeTrue();
    expect(formData.get('document')).toEqual(document);

    req.flush(dummyResponse);
  });
});
