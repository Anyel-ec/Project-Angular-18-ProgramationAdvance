import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './views/user/registration-form/registration-form.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadReceiptComponent } from './views/user/upload-receipt/upload-receipt.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UploadReceiptComponent,
    CommonModule,
    RegistrationFormComponent,
    NavComponent,
    FooterComponent,
    NavAdminComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project';
  showHeader: boolean = true;
  isAdmin: boolean = false;
  showFooter: boolean = true;


  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const loginRoute = ['/login', '/error-404', '/error-403', '/error-500',
          ,'/1',
          '/2',
          '/3',
          '/4',
          '/5',
        ];

        const adminRoutes = ['/verificar-registros', '/finalizar-proceso'];
                this.showHeader = !loginRoute.includes(event.urlAfterRedirects);
        this.isAdmin = adminRoutes.some(route => event.urlAfterRedirects.startsWith(route));



        //const hideHeaderAndFooter = routesToHideHeaderAndFooter.includes(event.urlAfterRedirects);
        //this.showHeader = !hideHeaderAndFooter;
        //this.showFooter = !hideHeaderAndFooter;
      }
    });
  }


}
