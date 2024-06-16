import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgFallimgModule } from 'ng-fallimg';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-receipt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss'],
})
export class UploadReceiptComponent {
  fileUrl: SafeResourceUrl | null = null;  
  isImage: boolean = false;
  form: FormGroup;

  constructor(private sanitizer: DomSanitizer, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      file: new FormControl('', [Validators.required]),
    });    
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        this.isImage = file.type.startsWith('image/');
      };
      reader.readAsDataURL(file);
    }
  }

  clearFile(): void {
    this.fileUrl = null;
    this.isImage = false;
    this.form.get('file')?.reset();
  }

  onSubmit(): void {
    if (this.form.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Comprobante Enviado',
        text: 'El comprobante se ha enviado con éxito.',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.fileUrl = null;
          this.isImage = false;
          this.form.get('file')?.reset();
        }
      });
    } else {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Por favor, suba el comprobante antes de enviar.',
        confirmButtonText: 'Aceptar'
      });
      
    }
  }
}
