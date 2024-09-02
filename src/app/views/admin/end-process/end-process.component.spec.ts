import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { EndProcessComponent } from './end-process.component';
import { VerifyDocumentService } from '../../../services/verifyDocument/verify-document.service';
import { of, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UPLOAD_IMPORTS } from './importsModule';

describe('EndProcessComponent', () => {
  let component: EndProcessComponent;
  let fixture: ComponentFixture<EndProcessComponent>;
  let verifyDocumentServiceSpy: jasmine.SpyObj<VerifyDocumentService>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    const verifyDocumentSpy = jasmine.createSpyObj('VerifyDocumentService', [
      'getRelationsVerifyDocument',
      'updateVerifyDocument',
      'deleteVerifyDocument',
      'updateUploadDocumentAgain'
    ]);
    
    verifyDocumentSpy.updateVerifyDocument.and.returnValue(of({}));
    verifyDocumentSpy.getRelationsVerifyDocument.and.returnValue(of([]));
    verifyDocumentSpy.deleteVerifyDocument.and.returnValue(of({}));
    verifyDocumentSpy.updateUploadDocumentAgain.and.returnValue(of({}));

    const sanitizerSpyObj = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);
    sanitizerSpy = sanitizerSpyObj;

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ...UPLOAD_IMPORTS,
        // Asegúrate de que EndProcessComponent se está declarando como standalone
        EndProcessComponent, 
      ],
      providers: [
        { provide: VerifyDocumentService, useValue: verifyDocumentSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
        
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EndProcessComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', fakeAsync(() => {
    const mockData = [
      {
        _id: '1',
        identification: '123',
        name: 'Test',
        commandType: 'Type',
        gradeNote: 10,
        document: 'doc',
        verifyDocumentState: 'Pending',
        uploadDocumentState: 'Uploaded',
        typeDocument: 'pdf',
      },
    ];
    verifyDocumentServiceSpy.getRelationsVerifyDocument.and.returnValue(
      of(mockData)
    );

    component.ngOnInit();
    tick();

    expect(component.data.length).toBe(1);
    expect(component.filteredData.length).toBe(1);
  }));

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

  it('should handle ver comprobante with non-image', () => {
    const mockDocument = {
      id: '1',
      cedula: '123',
      nombresCompletos: 'Test',
      tipoCurso: 'Course',
      notaGrado: 10,
      documento: 'testdoc',
      estadoVerificacion: 'Pending',
      estadoDocumento: 'Uploaded',
      typeDocument: 'application/pdf',
    };
    sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue(
      'safe_url' as any
    );

    component.verComprobante(mockDocument);

    expect(component.Comprobante).toBeTrue();
    expect(component.selectedDocument).toEqual(mockDocument);
    expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
  });

  it('should handle reenviar enlace', async() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    
    component.reenviarEnlace('1');
    
    fixture.whenStable().then(() => {
      expect(verifyDocumentServiceSpy.updateUploadDocumentAgain).toHaveBeenCalledWith('1');
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

  it('should handle errors in fetchData', fakeAsync(() => {
    verifyDocumentServiceSpy.getRelationsVerifyDocument.and.returnValue(throwError('Error'));
  
    component.fetchData();
    
    tick(); // Avanza el reloj para manejar la promesa
    
    expect(component.data.length).toBe(0);
  }));

  it('should call fetchData and filterData on updateTable', () => {
    spyOn(component, 'fetchData').and.callThrough();
    spyOn(component, 'filterData').and.callThrough();

    component.updateTable();

    expect(component.fetchData).toHaveBeenCalled();
    expect(component.filterData).toHaveBeenCalled();
  });

  it('should handle aceptar', fakeAsync(() => {
    // Espía para Swal.fire, que debe devolver una promesa resuelta con `isConfirmed: true`
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    
    // Espía para el servicio `updateVerifyDocument` y configura una respuesta exitosa
    verifyDocumentServiceSpy.updateVerifyDocument.and.returnValue(of({}));
    
    // Espía para el método `updateTable`
    spyOn(component, 'updateTable');
  
    // Documento de prueba
    const mockDocument = { 
      id: '1', 
      cedula: '123', 
      nombresCompletos: 'Test', 
      tipoCurso: 'Course', 
      notaGrado: 10, 
      documento: 'testdoc', 
      estadoVerificacion: 'Pendiente', 
      estadoDocumento: 'Uploaded', 
      typeDocument: 'pdf' 
    };
    
    // Llama al método `aceptar`
    component.aceptar(mockDocument);
    tick(); // Avanza el reloj para manejar la promesa de Swal.fire
    
    // Llama `tick` nuevamente para manejar la promesa del método `updateVerifyDocument`
    tick(); 
  
    // Verifica que `updateVerifyDocument` haya sido llamado con los parámetros correctos
    expect(verifyDocumentServiceSpy.updateVerifyDocument).toHaveBeenCalledWith('1', { updated_at: jasmine.any(Date) });
    
    // Verifica que Swal.fire haya sido llamado dos veces (una para la confirmación y otra para el mensaje de éxito)
    expect(Swal.fire).toHaveBeenCalledTimes(2);
  
    // Verifica que `updateTable` haya sido llamado
    expect(component.updateTable).toHaveBeenCalled();
  }));

  it('should handle aceptar errors', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    verifyDocumentServiceSpy.updateVerifyDocument.and.returnValue(throwError('Error'));
  
    const mockDocument = { 
      id: '1', 
      cedula: '123', 
      nombresCompletos: 'Test', 
      tipoCurso: 'Course', 
      notaGrado: 10, 
      documento: 'testdoc', 
      estadoVerificacion: 'Pendiente', 
      estadoDocumento: 'Uploaded', 
      typeDocument: 'pdf' 
    };
  
    component.aceptar(mockDocument);
    tick(); 
    
  
    expect(verifyDocumentServiceSpy.updateVerifyDocument).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledTimes(2);
  }));
});
