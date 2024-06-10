import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormsModule, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  form: FormGroup;
  provincias: string[] = [
    "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro",
    "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos",
    "Manabí", "Morona Santiago", "Napo", "Orellana", "Pastaza", "Pichincha",
    "Santa Elena", "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora Chinchipe"
  ];

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void { }

  private buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl('', [Validators.required, this.validarCedulaEcuatoriana]),
      nombreCompleto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      fechaNacimiento: new FormControl('', [Validators.required, this.validarEdadMinima(18)]),
      genero: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      tipoComando: new FormControl('', [Validators.required])
    });
  }

  private validarCedulaEcuatoriana(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula) {
      return null;
    }

    if (cedula.length !== 10) {
      return { cedulaInvalida: true };
    }

    const digitoRegion = parseInt(cedula.substring(0, 2), 10);
    if (digitoRegion < 1 || digitoRegion > 24) {
      return { cedulaInvalida: true };
    }

    const ultimoDigito = parseInt(cedula.substring(9, 10), 10);
    const pares = parseInt(cedula.substring(1, 2), 10) + parseInt(cedula.substring(3, 4), 10) + parseInt(cedula.substring(5, 6), 10) + parseInt(cedula.substring(7, 8), 10);
    let impares = 0;

    for (let i = 0; i < 9; i += 2) {
      let num = parseInt(cedula.charAt(i), 10) * 2;
      if (num > 9) {
        num -= 9;
      }
      impares += num;
    }

    const sumaTotal = pares + impares;
    const decenaSuperior = Math.ceil(sumaTotal / 10) * 10;
    const digitoVerificador = decenaSuperior - sumaTotal;

    if (digitoVerificador === 10 && ultimoDigito === 0) {
      return null;
    } else if (digitoVerificador === ultimoDigito) {
      return null;
    } else {
      return { cedulaInvalida: true };
    }
  }

  private validarEdadMinima(edadMinima: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaNacimiento = new Date(control.value);
      const fechaActual = new Date();
      const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
      const diferenciaMeses = fechaActual.getMonth() - fechaNacimiento.getMonth();
      const diferenciaDias = fechaActual.getDate() - fechaNacimiento.getDate();

      if (
        edad > edadMinima ||
        (edad === edadMinima && diferenciaMeses > 0) ||
        (edad === edadMinima && diferenciaMeses === 0 && diferenciaDias >= 0)
      ) {
        return null;
      } else {
        return { edadMinima: true };
      }
    };
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const datosFormulario = this.form.value;
      console.log(datosFormulario);
      // TODO : LOGICA PARA GUARDAR EN LA BASE DE DATOS

      Swal.fire({
        icon: 'success',
        title: 'Formulario Enviado',
        text: 'El formulario se ha enviado con éxito.',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Limpiar el formulario
          this.form.reset();
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
