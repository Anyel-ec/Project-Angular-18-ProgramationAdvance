import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MenubarModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  isNavActive: boolean = false;

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Formulario Aspirantes',
        icon: 'pi pi-fw pi-address-book',
        routerLink: ['/registro-aspirantes'],
      },
      /*{
        label: 'Envio Nota de Grado',
        icon: 'pi pi-fw pi-upload',
        routerLink: ['/subir-recibo'],
      },*/
      {
        label: 'Iniciar Sesión ',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/login'],
      },
    ];
  }
}
