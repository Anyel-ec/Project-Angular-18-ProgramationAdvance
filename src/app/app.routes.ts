import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { VerifyPaymentsComponent } from './views/verify-data/verify-payments.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'subir-recibo',
    component: UploadReceiptComponent,
  },
  {
    path: 'verificar-pagos',
    component: VerifyPaymentsComponent,
  },
  {
    path: 'registro-aspirantes',

    component: RegistrationFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', redirectTo: '/registro-aspirantes', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
