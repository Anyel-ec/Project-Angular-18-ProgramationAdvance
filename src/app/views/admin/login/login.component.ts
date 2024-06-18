import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup;
  hidePassword: boolean = true;

  validUsername = "soyadmin";
  validPassword = "soyadmin";

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password} = this.loginForm.value;
      if(username === this.validUsername && password === this.validPassword){
        this.router.navigate(['/'])
      } else {
        alert('Usuario o Contraseña Invalidos');
      }
      console.log('Formulario Enviado', this.loginForm.value);
    }
  }
}
