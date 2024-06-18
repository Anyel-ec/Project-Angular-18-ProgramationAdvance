import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [RouterLink, MenubarModule],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.scss'
})
export class NavAdminComponent {
  isNavActive: boolean = false;

  toggleNav(){
    this.isNavActive = !this.isNavActive;
  }

  items: MenuItem[];


  ngOnInit() {
      this.items = [
          {
            label:'Registros Aspirantes',
            icon: "pi pi-fw pi-search",
            routerLink: ['/verificar-registros']
          },
          {
            label:'Verificar Pagos',
            icon:'pi pi-fw pi-verified',
            routerLink: ['/finalizar-proceso']
          },
      ];
  }
}
