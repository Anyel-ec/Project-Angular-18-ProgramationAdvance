import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  validUsername = 'soyadmin';
  validPassword = 'soyadmin';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      if (usernameControl && passwordControl) {
        const { username, password } = this.loginForm.value;
        if (
          username === this.validUsername &&
          password === this.validPassword
        ) {
          this.router.navigate(['/verificar-registros']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Datos incorrectos",
            text: "Los datos ingresados no son correctos",
          });
          this.loginForm.reset();
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
