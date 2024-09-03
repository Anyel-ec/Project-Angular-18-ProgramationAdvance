import { Component, OnInit } from '@angular/core';
import { UPLOAD_IMPORTS } from './ImportsModule';
import Swal from 'sweetalert2';
import { VerifyDataService } from '../../../services/verifyData/verify-data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { catchError, of } from 'rxjs';

interface VerifyData {
  id: string;
  cedula: string;
  nombresCompletos: string;
  genero: string;
  provincia: string;
  tipoCurso: string;
  estado: string;
}

@Component({
  selector: 'app-verify-data',
  standalone: true,
  imports: [UPLOAD_IMPORTS],
  templateUrl: './verify-data.component.html',
  styleUrls: ['./verify-data.component.scss'],
  providers: [VerifyDataService, provideHttpClientTesting()],
})
export class VerifyDataComponent implements OnInit {

  data: VerifyData[] = [];
  searchTerm: string = '';
  filteredData: VerifyData[] = [];

  constructor(private verifyDataService: VerifyDataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.verifyDataService.getRelationsVerifyData().pipe(
      catchError(error => {
        console.error('Error al obtener los datos:', error);
        // Maneja el error y devuelve un observable vacío o valor por defecto
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe(response => {
      this.data = response.map((item: any) => ({
        id: item._id,
        cedula: item.identification,
        nombresCompletos: item.name,
        genero: item.gender,
        provincia: item.province,
        tipoCurso: item.commandType,
        estado: item.state
      }));
      this.filteredData = this.data;
    });
  }

  filterData(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(
        (curso) =>
          curso.cedula.includes(this.searchTerm) ||
          curso.nombresCompletos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.genero.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.provincia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.tipoCurso.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  updateVerifyData(id: string, updatedData: any): void {
    this.verifyDataService.updateVerifyData(id, updatedData).pipe(
      catchError(error => {
        console.error('Error al actualizar el dato:', error);
        // Maneja el error y devuelve un observable vacío o valor por defecto
        return of(null); // Retorna un valor por defecto en caso de error
      })
    ).subscribe(response => {
      console.log('Dato actualizado:', response);
    });
  }

  aceptar(rowData: VerifyData): void {
    console.log('Aceptar:', rowData);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se aceptará al aspirante",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = {
          updated_at: new Date()
        };
        this.updateVerifyData(rowData.id, updatedData);

        Swal.fire({
          title: "Aspirante aceptado",
          text: "Se emitirá el correo de confirmación al aspirante.",
          icon: "success"
        }).then(() => {
          this.updateTable();
        });
      }
    });
  }

  deleteVerifyData(id: string): void {
    this.verifyDataService.deleteVerifyData(id).pipe(
      catchError(error => {
        console.error('Error al eliminar el dato:', error);
        // Maneja el error y devuelve un observable vacío o valor por defecto
        return of(null); // Retorna un valor por defecto en caso de error
      })
    ).subscribe(response => {
      if (response) {
        console.log('Dato eliminado:', response);
      }
    });
  }

  rechazar(rowData: VerifyData): void {
    console.log('Declinar:', rowData);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se rechazará al aspirante.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rechazar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteVerifyData(rowData.id);
        Swal.fire({
          title: "Aspirante rechazado",
          text: "Se emitirá el correo al aspirante.",
          icon: "success"
        }).then(() => {
          this.updateTable();
        });
      }
    });
  }

  updateTable(): void {
    this.fetchData();
    this.filterData();
  }
}
