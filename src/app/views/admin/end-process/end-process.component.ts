import { Component, OnInit } from '@angular/core';
import { UPLOAD_IMPORTS } from './importsModule';
import Swal from 'sweetalert2';

interface Curso {
  id: number;
  cedula: string;
  nombresCompletos: string;
  genero: string;
  tipoCurso: string;
  estado: 'Pendiente' | 'Aceptado' | 'Rechazado' ;
}

@Component({
  selector: 'app-end-process',
  standalone: true,
  imports: [UPLOAD_IMPORTS],
  templateUrl: './end-process.component.html',
  styleUrl: './end-process.component.scss',
})
export class EndProcessComponent implements OnInit {
  data: Curso[] = [
    {
      id: 1,
      cedula: '1234567890',
      nombresCompletos: 'Juan Pérez',
      genero: 'Masculino',
      tipoCurso: 'Policia Nacional',
      estado: 'Pendiente',
    },
    {
      id: 2,
      cedula: '0987654321',
      nombresCompletos: 'María Gómez',
      genero: 'Femenino',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente',
    },
    {
      id: 3,
      cedula: '1122334455',
      nombresCompletos: 'Carlos Sánchez',
      genero: 'Masculino',
      tipoCurso: 'Bombero',
      estado: 'Pendiente',
    },
    {
      id: 4,
      cedula: '5566778899',
      nombresCompletos: 'Ana Martínez',
      genero: 'Femenino',
      tipoCurso: 'Militar',
      estado: 'Pendiente',
    },
    {
      id: 5,
      cedula: '6677889900',
      nombresCompletos: 'Pedro Fernández',
      genero: 'Masculino',
      tipoCurso: 'Policia',
      estado: 'Pendiente',
    },
    {
      id: 6,
      cedula: '1112223334',
      nombresCompletos: 'Luis González',
      genero: 'Masculino',
      tipoCurso: 'Marin',
      estado: 'Pendiente',
    },
    {
      id: 7,
      cedula: '5554443332',
      nombresCompletos: 'Laura Rodríguez',
      genero: 'Femenino',
      tipoCurso: 'Policia Nacional',
      estado: 'Pendiente',
    },
    {
      id: 8,
      cedula: '9998887776',
      nombresCompletos: 'Roberto Jiménez',
      genero: 'Masculino',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente',
    },
    {
      id: 9,
      cedula: '3332221110',
      nombresCompletos: 'Sofía Ramírez',
      genero: 'Femenino',
      tipoCurso: 'Bombero',
      estado: 'Pendiente',
    },
    {
      id: 10,
      cedula: '7776665558',
      nombresCompletos: 'Daniel López',
      genero: 'Masculino',
      tipoCurso: 'Militar',
      estado: 'Pendiente',
    },
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
          curso.id.toString().includes(this.searchTerm) ||
          curso.cedula.includes(this.searchTerm) ||
          curso.nombresCompletos
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          curso.genero.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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

  verComprobante(rowData: Curso): void {
    this.Comprobante = true;
  }

  aceptar(rowData: Curso): void {
    if (rowData.estado === 'Pendiente') {
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
          Swal.fire({
            title: 'Inscripcion aceptada',
            text: 'Se emitira el correo de confirmación al aspirante.',
            icon: 'success',
          });
          rowData.estado = 'Aceptado';
        }
      });
    }
  }
  rechazar(rowData: Curso): void {
    if (rowData.estado === 'Pendiente') {
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
          Swal.fire({
            title: 'Inscripcion rechazada',
            text: 'Se emitira el correo al aspirante.',
            icon: 'success',
          });
          rowData.estado = 'Rechazado';
        }
      });
    }
  }
}
