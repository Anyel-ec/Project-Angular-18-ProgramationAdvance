import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PersonData {
  cedula: string;
  nombreCompleto: string;
  genero: string;
  provincia: string;
  tipoDeComando: string;
  estado: string;
}



const ESTADOS = [
  { value: 'APROBADO', color: 'green' },
  { value: 'NO APROBADO', color: 'red' },
  { value: 'PENDIENTE', color: 'gray' }
];

const ELEMENT_DATA: PersonData[] = [
  { cedula: '0102030405', nombreCompleto: 'Juan Perez', genero: 'Masculino', provincia: 'Pichincha', tipoDeComando: 'Comando 1', estado: 'APROBADO' },
  { cedula: '0203040506', nombreCompleto: 'Maria Garcia', genero: 'Femenino', provincia: 'Guayas', tipoDeComando: 'Comando 2', estado: 'PENDIENTE' },
  { cedula: '0304050607', nombreCompleto: 'Carlos Ruiz', genero: 'Masculino', provincia: 'Azuay', tipoDeComando: 'Comando 3', estado: 'RECHAZADO' },
  { cedula: '0405060708', nombreCompleto: 'Ana Torres', genero: 'Femenino', provincia: 'Manabí', tipoDeComando: 'Comando 1', estado: 'APROBADO' },
  { cedula: '0506070809', nombreCompleto: 'Luis Gómez', genero: 'Masculino', provincia: 'Loja', tipoDeComando: 'Comando 2', estado: 'PENDIENTE' },
  { cedula: '0607080910', nombreCompleto: 'Sofía Martínez', genero: 'Femenino', provincia: 'Esmeraldas', tipoDeComando: 'Comando 3', estado: 'RECHAZADO' },
  { cedula: '0708091011', nombreCompleto: 'Diego Ramírez', genero: 'Masculino', provincia: 'Imbabura', tipoDeComando: 'Comando 1', estado: 'APROBADO' },
  { cedula: '0809101112', nombreCompleto: 'Valeria López', genero: 'Femenino', provincia: 'El Oro', tipoDeComando: 'Comando 2', estado: 'PENDIENTE' },
  { cedula: '0910111213', nombreCompleto: 'Andrés Sánchez', genero: 'Masculino', provincia: 'Tungurahua', tipoDeComando: 'Comando 3', estado: 'RECHAZADO' },
  { cedula: '1011121314', nombreCompleto: 'Lucía Fernández', genero: 'Femenino', provincia: 'Chimborazo', tipoDeComando: 'Comando 1', estado: 'APROBADO' },
];

@Component({
  selector: 'app-verify-data',
  standalone: true,
  templateUrl: './verify-data.component.html',
  styleUrls: ['./verify-data.component.scss'],
  imports: [MatSelectModule, CommonModule, MatButtonModule, MatIconModule, FormsModule]
})
export class VerifyDataComponent implements AfterViewInit {
  displayedColumns: string[] = ['cedula', 'nombreCompleto', 'genero', 'provincia', 'tipoDeComando', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<PersonData>(ELEMENT_DATA);
  estados = ESTADOS;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getEstadoColor(estado: string): string {
    return this.estados.find(e => e.value === estado)?.color || 'black';
  }
}
