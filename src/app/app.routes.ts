import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
//import { RegistrationFormComponent } from './emails/registration-form/registration-form.component';
import { VerifyPaymentsComponent } from './views/verify-data/verify-payments.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { VerifyDataComponent } from './emails/verify-data/verify-data.component';
import { VerifyDataDeniedComponent } from './emails/verify-data-denied/verify-data-denied.component';
import { EndProcessComponent } from './emails/end-process/end-process.component';
import { EndProcessDeniedComponent } from './emails/end-process-denied/end-process-denied.component';

export const routes: Routes = [
  {
    path: 'subir-recibo', component: UploadReceiptComponent,
  },
  {
    path: 'verificar-pagos', component: VerifyPaymentsComponent,
  },
  {
    path: 'registro-aspirantes', component: RegistrationFormComponent
  },
  /*
  {
    path: 'email-registro-datos', component: RegistrationFormComponent
  },
  */
  {
    path: 'email-datos-aceptados', component: VerifyDataComponent
  },
  {
    path: 'email-datos-rechazados', component: VerifyDataDeniedComponent
  },
  {
    path: 'email-comprobante-aceptado', component: EndProcessComponent
  },
  {
    path: 'email-comprobante-rechazado', component: EndProcessDeniedComponent
  },
  {
    path: 'login', component: LoginComponent
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
