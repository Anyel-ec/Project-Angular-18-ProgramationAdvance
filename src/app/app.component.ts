import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { NgFallimgModule } from 'ng-fallimg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadReceiptComponent, CommonModule, RegistrationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'project';

}
