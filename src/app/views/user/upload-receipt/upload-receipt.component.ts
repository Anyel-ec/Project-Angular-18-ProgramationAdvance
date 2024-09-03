import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadDocumentService } from '../../../services/uploadDocument/upload-document.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-upload-receipt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss'],
  providers: [UploadDocumentService, provideHttpClientTesting()],
})
export class UploadReceiptComponent implements OnInit {
  fileUrl: SafeResourceUrl | null = null;
  isImage: boolean = false;
  form: FormGroup;

  id: string | null;
  selectedFile: File | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadDocumentService: UploadDocumentService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      file: new FormControl('', [Validators.required]),
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // Validación del archivo (tipo y tamaño)
      if (this.isValidFile(file)) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          const fileResult = reader.result as string;

          // Validación adicional antes de desactivar la sanitización
          if (this.isSafeContent(fileResult)) {
            this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileResult);
            this.isImage = file.type.startsWith('image/');
          } else {
            console.error('Contenido no seguro detectado:', fileResult);
            Swal.fire({
              icon: 'error',
              title: 'Error de seguridad',
              text: 'El contenido del archivo no es seguro.',
              confirmButtonText: 'Aceptar',
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Archivo no válido:', file);
        Swal.fire({
          icon: 'error',
          title: 'Archivo no válido',
          text: 'El archivo seleccionado no es válido. Por favor, seleccione un archivo con un formato permitido y un tamaño menor a 5MB.',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  }

  private isValidFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Tipos permitidos
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes

    // Validar tipo de archivo y tamaño
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }

  private isSafeContent(content: string): boolean {
    // Aquí puedes implementar lógica adicional para verificar la seguridad del contenido
    return true; // Retorna 'true' si el contenido es seguro.
  }

  clearFile(): void {
    this.fileUrl = null;
    this.isImage = false;
    this.form.get('file')?.reset();
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile && this.id) {
      this.uploadDocumentService.updateVerifyDocument(this.id, this.selectedFile).pipe(
        catchError(error => {
          console.error('Error al actualizar el documento', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al enviar el documento. Por favor, intente nuevamente.',
            confirmButtonText: 'Aceptar',
          });
          return of(null); // Devuelve un observable vacío para continuar con el flujo
        }),
        finalize(() => {
          Swal.fire({
            icon: 'success',
            title: 'Documento Enviado',
            text: 'El documento se ha enviado con éxito, será redirigido a la página principal.',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.clearFile();
              this.router.navigate(['']);
            }
          });
        })
      ).subscribe();
    } else {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Por favor, suba el documento antes de enviar.',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
