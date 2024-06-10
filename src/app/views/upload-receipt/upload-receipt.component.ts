import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-receipt.component.html',
  styleUrl: './upload-receipt.component.scss',
})
export class UploadReceiptComponent {
  fileUrl: SafeResourceUrl | null = null;  
  isImage: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

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

  onSubmit(): void {
    console.log('Archivo subido:', this.fileUrl);
  }
}
