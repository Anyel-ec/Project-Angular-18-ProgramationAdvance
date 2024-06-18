import { Component, OnInit } from '@angular/core';
import { UPLOAD_IMPORTS } from './ImportsModule';
import Swal from 'sweetalert2';

interface Curso {
  id: number;
  cedula: string;
  nombresCompletos: string;
  genero: string;
  provincia: string;
  tipoCurso: string;
  aceptado?: boolean; // Nueva propiedad
}

@Component({
  selector: 'app-verify-data',
  standalone: true,
  imports: [UPLOAD_IMPORTS],
  templateUrl: './verify-data.component.html',
  styleUrls: ['./verify-data.component.scss'],
  providers: [],
})
export class VerifyDataComponent implements OnInit {

  data: Curso[] = [
    {
      id: 1,
      cedula: '1234567890',
      nombresCompletos: 'Juan Pérez',
      genero: 'Masculino',
      provincia: 'Pichincha',
      tipoCurso: 'Policia Nacional',
    },
    {
      id: 2,
      cedula: '0987654321',
      nombresCompletos: 'María Gómez',
      genero: 'Femenino',
      provincia: 'Guayas',
      tipoCurso: 'Policia de Transito',
    },
    // Agrega más datos según sea necesario
  ];

  searchTerm: string = '';
  filteredData: Curso[] = [];
  Comprobante: boolean = false;

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  filterData(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(
        (curso) =>
          curso.cedula.includes(this.searchTerm) ||
          curso.nombresCompletos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.genero.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.provincia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          curso.tipoCurso.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  verComprobante(rowData: Curso): void {
    console.log('Ver comprobante de:', rowData);
    this.Comprobante = true;
  }

  aceptar(rowData: Curso): void {
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
        Swal.fire({
          title: "Aspirante aceptado",
          text: "Se emitirá el correo de confirmación al aspirante.",
          icon: "success"
        });
        rowData.aceptado = true; // Actualiza el estado del aspirante
      }
    });
  }

  rechazar(rowData: Curso): void {
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
        Swal.fire({
          title: "Aspirante rechazado",
          text: "Se emitirá el correo al aspirante.",
          icon: "success"
        });
        rowData.aceptado = false; // Actualiza el estado del aspirante
      }
    });
  }
}
