import { Component, OnInit } from '@angular/core';
import { UPLOAD_IMPORTS } from './importsModule';
import Swal from 'sweetalert2';
import { VerifyDocumentService } from '../../../services/verifyDocument/verify-document.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { catchError, of, tap } from 'rxjs';

interface VerifiDocument {
  id: string;
  cedula: string;
  nombresCompletos: string;
  tipoCurso: string;
  notaGrado: number;
  documento: string;
  estadoVerificacion: string;
  estadoDocumento: string;
  typeDocument: string;
}

@Component({
  selector: 'app-end-process',
  standalone: true,
  imports: [UPLOAD_IMPORTS],
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.scss'],
  providers: [VerifyDocumentService, provideHttpClientTesting()],
})
export class EndProcessComponent implements OnInit {

  data: VerifiDocument[] = [];
  searchTerm: string = '';
  filteredData: VerifiDocument[] = [];

  Comprobante: boolean = false;
  selectedDocumentUrl: SafeUrl | null = null;
  selectedDocument: VerifiDocument | null = null;

  constructor(private VerifyDocumentService: VerifyDocumentService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.VerifyDocumentService.getRelationsVerifyDocument().pipe(
      tap((response) => {
        this.data = response.map((item: any) => ({
          id: item._id,
          cedula: item.identification,
          nombresCompletos: item.name,
          tipoCurso: item.commandType,
          notaGrado: item.gradeNote,
          documento: item.document,
          estadoVerificacion: item.verifyDocumentState,
          estadoDocumento: item.uploadDocumentState,
          typeDocument: item.typeDocument,
        }));
        this.filteredData = this.data;
      }),
      catchError((error) => {
        console.error('Error al obtener los datos:', error);
        return of([]); // Devolver un arreglo vacío o manejar el error de otra manera
      })
    ).subscribe();
  }


  filterData(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(
        (curso) =>
          curso.id.toString().includes(this.searchTerm) ||
          curso.cedula.includes(this.searchTerm) ||
          curso.nombresCompletos
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          curso.tipoCurso
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          curso.estadoVerificacion
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          curso.estadoDocumento
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
    }
  }

  filterGlobal(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      const searchValue = input.value;
      this.searchTerm = searchValue;
      this.filterData();
    }
  }

  verComprobante(rowData: VerifiDocument): void {
    this.Comprobante = true;
    this.selectedDocument = rowData;

    const mimeType = rowData.typeDocument;
    const base64Data = rowData.documento;

    if (this.isValidMimeType(mimeType) && this.isValidBase64(base64Data)) {
      this.selectedDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${mimeType};base64,${base64Data}`);
    } else {
      // Usar una URL segura por defecto o manejar el caso de error de otra manera
      this.selectedDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
      console.error('Datos no válidos para crear la URL del documento.');
    }

    console.log(rowData.documento);
    console.log(rowData.typeDocument);
  }

  // Método para validar MIME type
  private isValidMimeType(mimeType: string): boolean {
    // Agrega validación según los tipos MIME que esperas
    const validMimeTypes = ['application/pdf', 'image/png', 'image/jpeg']; // Ejemplo
    return validMimeTypes.includes(mimeType);
  }

  // Método para validar datos Base64
  private isValidBase64(base64Data: string): boolean {
    // Verifica que base64Data tenga una estructura esperada (esto puede ser ajustado según tus necesidades)
    const base64Pattern = /^[A-Za-z0-9+/=]+$/;
    return base64Pattern.test(base64Data);
  }

  updateVerifyData(id: string, updatedData: any): void {
    this.VerifyDocumentService.updateVerifyDocument(id, updatedData).subscribe();
  }

  aceptar(rowData: VerifiDocument): void {
    if (rowData.estadoVerificacion === 'Pendiente') {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Se aceptará la inscripcion del aspirante.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedData = {
            updated_at: new Date()
          };
          this.updateVerifyData(rowData.id, updatedData);
          Swal.fire({
            title: 'Inscripcion aceptada',
            text: 'Se emitira el correo de confirmación al aspirante.',
            icon: 'success',
          }).then(() => {
            this.updateTable();
          });
        }
      });
    }
  }

  deleteVerifyDocument(id: string): void {
    this.VerifyDocumentService.deleteVerifyDocument(id).subscribe();
  }

  rechazar(rowData: VerifiDocument): void {
    if (rowData.estadoVerificacion === 'Pendiente') {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Se rechazara la inscripcion del aspirante.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Rechazar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteVerifyDocument(rowData.id);
          Swal.fire({
            title: 'Inscripcion rechazada',
            text: 'Se emitira el correo al aspirante.',
            icon: 'success',
          }).then(() => {
            this.updateTable();
          });
        }
      });
    }
  }

  reenviarEnlace(id: string): void {
    this.VerifyDocumentService.updateUploadDocumentAgain(id).pipe(
      tap((response) => {
        console.log('Correo Reenviado:', response);
      }),
      catchError((error) => {
        console.error('Error al reenviar el correo:', error);
        return of(null); // Devolver un observable que maneje el error de forma segura
      })
    ).subscribe();
  }


  reenviarEnlaceAlert(rowData: VerifiDocument): void {
    if (rowData.estadoVerificacion === 'Pendiente') {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'Se reenviará el enlace para que el aspirante suba el documento nuevamente.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reenviar enlace',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reenviarEnlace(rowData.id);
          Swal.fire({
            title: 'Enlace reenviado',
            text: 'Se ha enviado el correo al aspirante con el enlace para subir el documento.',
            icon: 'success'
          });
        }
      });
    }
  }

  updateTable(): void {
    this.fetchData();
    this.filterData();
  }
}
