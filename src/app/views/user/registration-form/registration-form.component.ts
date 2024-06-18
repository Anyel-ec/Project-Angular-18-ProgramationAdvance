import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormsModule, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RecaptchaModule, RecaptchaFormsModule],
  providers: [FormBuilder],
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

  ngOnInit(): void {

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl('', [Validators.required, this.validarCedulaEcuatoriana]),
      nombreCompleto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), this.validarNombreCompleto]),
      fechaNacimiento: new FormControl('', [Validators.required, this.validarEdadMinima(18)]),
      genero: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      tipoComando: new FormControl('', [Validators.required]),
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*'), this.validarNumeroCelular]],
      correoElectronico: ['', [Validators.required, Validators.email, this.validarCorreoElectronico]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      notaGrado: ['', [Validators.required, Validators.min(0), Validators.max(20), this.validarNotaGrado]]
    });
  }


  captchaValid: boolean = false;

  // Metodo para validar el captcha de Google
  resolved(captchaResponse: string | null) {
    this.captchaValid = captchaResponse !== null && captchaResponse.length > 0;
  }

  private validarNombreCompleto(control: AbstractControl): ValidationErrors | null {
    const nombre = control.value;
    if (!nombre) {
      return null;
    }

    if (nombre.length < 3) {
      return { nombreInvalido: true };
    }
    // Expresión regular para tildes y texto en latam para validar nombres completos no permitir numeros o signos
    const expresionRegular = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u0020\u0027\u002E\u002D]*$/;
    if (expresionRegular.test(nombre)) {
      return null;
    } else {
      return { nombreInvalido: true };
    }

    return null;
  }

  private validarNotaGrado(control: AbstractControl): ValidationErrors | null {
    const nota = control.value;
    if (!nota) {
      return null;
    }

    if (nota < 0 || nota > 20) {
      return { notaGradoInvalida: true };
    }

    return null;
  }

  private validarCorreoElectronico(control: AbstractControl): ValidationErrors | null {
    const correo = control.value;
    if (!correo) {
      return null;
    }

    const expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (expresionRegular.test(correo)) {
      return null;
    } else {
      return { correoInvalido: true };
    }
  }

  private validarNumeroCelular(control: AbstractControl): ValidationErrors | null {
    const telefono = control.value;
    if (!telefono) {
      return null;
    }

    if (telefono.length !== 10) {
      return { telefonoInvalido: true };
    }

    const primerosDigitos = telefono.substring(0, 2);
    if (primerosDigitos !== '09' && primerosDigitos !== '08') {
      return { telefonoInvalido: true };
    }



    return null;
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
  // Métodos para obtener errores de validación específicos
  getError(controlName: string, errorType: string) {
    const control = this.form.get(controlName);
    return control?.hasError(errorType) && control?.touched;
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  isValid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.valid && control?.touched;
  }

  markAsTouched(controlName: string): void {
    const control = this.form.get(controlName);
    control?.markAsTouched();
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
