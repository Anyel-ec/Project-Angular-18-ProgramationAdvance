import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadReceiptComponent, CommonModule, RegistrationFormComponent, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'project';

}
