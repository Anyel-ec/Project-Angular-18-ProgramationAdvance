import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-data-success',
  standalone: true,
  imports: [],
  templateUrl: './verify-data-success.component.html',
  styleUrl: './verify-data-success.component.scss',
  host: {
    'ngSkipHydration': ''
  }
})
export class VerifyDataSuccessComponent {
  linkSubida: string = '/subir-recibo';
}
