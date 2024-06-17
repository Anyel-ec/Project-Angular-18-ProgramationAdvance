import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-data',
  standalone: true,
  imports: [],
  templateUrl: './verify-data.component.html',
  styleUrl: './verify-data.component.scss'
})
export class VerifyDataComponent {
  linkSubida: string = '/subir-recibo';
}
