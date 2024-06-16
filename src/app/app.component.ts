import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
=======
>>>>>>> 90d12b9c2e64b9b5844fa527427a8918c1ef43fb

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, UploadReceiptComponent, CommonModule, RegistrationFormComponent, NavComponent, FooterComponent],
=======
  imports: [RouterOutlet, CommonModule ],
>>>>>>> 90d12b9c2e64b9b5844fa527427a8918c1ef43fb
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'project';

}
