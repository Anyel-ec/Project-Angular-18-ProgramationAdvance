import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  togglePasswordVisibility() {
    const eyeicon = document.getElementById("eyeicon") as HTMLImageElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (password.type === "password") {
      password.type = "text";
      eyeicon.src = "/src/app/images/eye-open.png";
    } else {
      password.type = "password";
      eyeicon.src = "/src/app/images/eye-close.png";
    }
  }

  ngOnInit() {
    const eyeicon = document.getElementById("eyeicon");
    if (eyeicon) {
      eyeicon.addEventListener('click', this.togglePasswordVisibility);
    }
  }

}
