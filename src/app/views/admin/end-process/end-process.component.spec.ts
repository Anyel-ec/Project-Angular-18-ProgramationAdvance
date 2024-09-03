import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { EndProcessComponent } from './end-process.component';
import { VerifyDocumentService } from '../../../services/verifyDocument/verify-document.service';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UPLOAD_IMPORTS } from './importsModule';

describe('EndProcessComponent', () => {
  let component: EndProcessComponent;
  let fixture: ComponentFixture<EndProcessComponent>;
  let verifyDocumentServiceSpy: jasmine.SpyObj<VerifyDocumentService>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;
  let mockVerifyDataService: jasmine.SpyObj<VerifyDocumentService>;

  beforeEach(() => {
    const verifyDocumentSpy = jasmine.createSpyObj('VerifyDocumentService', [
      'getRelationsVerifyDocument',
      'updateVerifyDocument',
      'deleteVerifyDocument',
      'updateUploadDocumentAgain',
    ]);

    verifyDocumentSpy.updateVerifyDocument.and.returnValue(of({})); // Simula la respuesta del servicio
    verifyDocumentSpy.deleteVerifyDocument.and.returnValue(of({}));
    verifyDocumentSpy.updateUploadDocumentAgain.and.returnValue(of({}));

    const sanitizerSpyObj = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);

    TestBed.configureTestingModule({
      imports: [
        ...UPLOAD_IMPORTS,
        EndProcessComponent,
      ],
      providers: [
        provideHttpClientTesting(), // Reemplazo de HttpClientTestingModule
        { provide: VerifyDocumentService, useValue: verifyDocumentSpy },
        { provide: DomSanitizer, useValue: sanitizerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EndProcessComponent);
    component = fixture.componentInstance;
    sanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchData on ngOnInit', () => {
    spyOn(component, 'fetchData').and.callThrough();
    component.ngOnInit();
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should filter data', () => {
    component.data = [
      {
        id: '1',
        cedula: '123',
        nombresCompletos: 'Test One',
        tipoCurso: 'Course A',
        notaGrado: 10,
        documento: 'doc1',
        estadoVerificacion: 'Pending',
        estadoDocumento: 'Uploaded',
        typeDocument: 'pdf',
      },
      {
        id: '2',
        cedula: '456',
        nombresCompletos: 'Test Two',
        tipoCurso: 'Course B',
        notaGrado: 9,
        documento: 'doc2',
        estadoVerificacion: 'Approved',
        estadoDocumento: 'Verified',
        typeDocument: 'jpg',
      },
    ];
    component.searchTerm = 'Test';
    component.filterData();
    expect(component.filteredData.length).toBe(2);

    component.searchTerm = 'One';
    component.filterData();
    expect(component.filteredData.length).toBe(1);
  });

  it('should handle global filter', () => {
    const mockEvent = { target: { value: 'Test' } } as any;
    component.filterGlobal(mockEvent);
    expect(component.searchTerm).toBe('Test');
  });

  it('should handle ver comprobante', () => {
    const mockDocument = {
      id: '1',
      cedula: '123',
      nombresCompletos: 'Test',
      tipoCurso: 'Course',
      notaGrado: 10,
      documento: 'testdoc',
      estadoVerificacion: 'Pending',
      estadoDocumento: 'Uploaded',
      typeDocument: 'image/png',
    };
    sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue(
      'safe_url' as any
    );

    component.verComprobante(mockDocument);

    expect(component.Comprobante).toBeTrue();
    expect(component.selectedDocument).toEqual(mockDocument);
    expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
  });

  it('should handle reenviar enlace', async () => {
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true } as any)
    );

    component.reenviarEnlace('1');

    fixture.whenStable().then(() => {
      expect(
        verifyDocumentServiceSpy.updateUploadDocumentAgain
      ).toHaveBeenCalledWith('1');
    });
  });

  it('should handle reenviar enlace alert', fakeAsync(() => {
    const mockDocument = {
      id: '1',
      cedula: '123',
      nombresCompletos: 'Test',
      tipoCurso: 'Course',
      notaGrado: 10,
      documento: 'testdoc',
      estadoVerificacion: 'Pendiente',
      estadoDocumento: 'Uploaded',
      typeDocument: 'pdf',
    };
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true } as any)
    );
    spyOn(component, 'reenviarEnlace');

    component.reenviarEnlaceAlert(mockDocument);
    tick();

    expect(component.reenviarEnlace).toHaveBeenCalledWith('1');
    expect(Swal.fire).toHaveBeenCalledTimes(2);
  }));

  it('should update table', () => {
    spyOn(component, 'fetchData').and.callThrough();
    spyOn(component, 'filterData').and.callThrough();

    component.updateTable();
    fixture.detectChanges();

    expect(component.fetchData).toHaveBeenCalled();
    expect(component.filterData).toHaveBeenCalled();
  });
});
