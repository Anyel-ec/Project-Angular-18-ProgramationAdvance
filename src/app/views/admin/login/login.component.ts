import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login/login.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService // Inyecta el servicio
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(username, password, "Proyecto");

      this.loginService.loginUser({ usernameOrEmail: username, password }).pipe(
        catchError((error) => {
          // Maneja el error aquí
          Swal.fire({
            icon: 'error',
            title: 'Datos incorrectos',
            text: 'Los datos ingresados no son correctos',
          });
          this.loginForm.reset();
          return of(null); // Devuelve un observable vacío en caso de error
        })
      ).subscribe(
        (data) => {
          if (data) {
            console.log('Login successful', data);
            this.router.navigate(['/verificar-registros']); // Navega a la ruta deseada después de un inicio de sesión exitoso
          }
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
