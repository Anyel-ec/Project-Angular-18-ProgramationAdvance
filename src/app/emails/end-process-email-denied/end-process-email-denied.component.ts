import { Component } from '@angular/core';

@Component({
  selector: 'app-end-process-email-denied',
  standalone: true,
  imports: [],
  templateUrl: './end-process-email-denied.component.html',
  styleUrl: './end-process-email-denied.component.scss',
  host: {
    'ngSkipHydration': ''
  }
})
export class EndProcessEmailDeniedComponent {
  linkSubida: string = '/subir-recibo';
}
