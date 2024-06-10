import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadReceiptComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
}
