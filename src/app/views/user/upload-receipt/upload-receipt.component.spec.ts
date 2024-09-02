import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UploadReceiptComponent } from './upload-receipt.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadDocumentService } from '../../../services/uploadDocument/upload-document.service';
import Swal from 'sweetalert2';

describe('UploadReceiptComponent', () => {
  let component: UploadReceiptComponent;
  let fixture: ComponentFixture<UploadReceiptComponent>;
  let uploadDocumentService: jasmine.SpyObj<UploadDocumentService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const uploadDocumentServiceSpy = jasmine.createSpyObj('UploadDocumentService', ['updateVerifyDocument']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UploadReceiptComponent, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => url } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
        { provide: UploadDocumentService, useValue: uploadDocumentServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    uploadDocumentService = TestBed.inject(UploadDocumentService) as jasmine.SpyObj<UploadDocumentService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should handle file selection', () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const mockEvent = { target: { files: [mockFile] } };
    component.onFileSelected(mockEvent);
    expect(component.selectedFile).toBe(mockFile);
    expect(true).toBeTrue();
  });

  it('should clear file', () => {
    component.clearFile();
    expect(component.fileUrl).toBeNull();
    expect(component.isImage).toBeFalse();
    expect(component.selectedFile).toBeNull();
  });

  it('should submit form successfully', () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    component.selectedFile = new File([''], 'test.pdf', { type: 'application/pdf' });
    component.id = '123';
    uploadDocumentService.updateVerifyDocument.and.returnValue(of({}));
    component.onSubmit();
    expect(Swal.fire).toHaveBeenCalled();
    expect(true).toBeTrue();
  });

  it('should submit form with error when file is not selected', () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    component.id = '123';
    uploadDocumentService.updateVerifyDocument.and.returnValue(of({}));
    component.onSubmit();
    
    const expectedAlert = {
      icon: 'warning',
      title: 'Error',
      text: 'Por favor, suba el documento antes de enviar.',
      confirmButtonText: 'Aceptar',
    };
  
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining(expectedAlert));
    expect(uploadDocumentService.updateVerifyDocument).not.toHaveBeenCalled();
    expect(component['router'].navigate).not.toHaveBeenCalled();
  });
  
  
  
});