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
  estado: string; // Nueva propiedad
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
      estado: 'Pendiente', // Estado inicial
    },
    {
      id: 2,
      cedula: '0987654321',
      nombresCompletos: 'María Gómez',
      genero: 'Femenino',
      provincia: 'Guayas',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente', // Estado inicial
    },
    {
      id: 3,
      cedula: '1234567890',
      nombresCompletos: 'Carlos Pérez',
      genero: 'Masculino',
      provincia: 'Pichincha',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    },
    {
      id: 4,
      cedula: '2345678901',
      nombresCompletos: 'Ana Martínez',
      genero: 'Femenino',
      provincia: 'Manabí',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    },
    {
      id: 5,
      cedula: '3456789012',
      nombresCompletos: 'Jorge Rodríguez',
      genero: 'Masculino',
      provincia: 'Azuay',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    },
    {
      id: 6,
      cedula: '4567890123',
      nombresCompletos: 'Luisa Fernández',
      genero: 'Femenino',
      provincia: 'Loja',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    },
    {
      id: 7,
      cedula: '5678901234',
      nombresCompletos: 'David Morales',
      genero: 'Masculino',
      provincia: 'El Oro',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    },
    {
      id: 8,
      cedula: '6789012345',
      nombresCompletos: 'Laura Rivas',
      genero: 'Femenino',
      provincia: 'Tungurahua',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    },
    {
      id: 9,
      cedula: '7890123456',
      nombresCompletos: 'Pedro Castro',
      genero: 'Masculino',
      provincia: 'Imbabura',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    },
    {
      id: 10,
      cedula: '8901234567',
      nombresCompletos: 'Sofía Herrera',
      genero: 'Femenino',
      provincia: 'Chimborazo',
      tipoCurso: 'Policia de Transito',
      estado: 'Pendiente'
    }    
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
        rowData.estado = 'Aceptado'; // Actualiza el estado del aspirante
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
        rowData.estado = 'Rechazado'; // Actualiza el estado del aspirante
      }
    });
  }
}
