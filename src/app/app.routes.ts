import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { VerifyDataComponent } from './views/verify-data/verify-data.component';
import { EndProcessComponent } from './views/end-process/end-process.component';

export const routes: Routes = [
  {
    path: 'subir-recibo',
    component: UploadReceiptComponent,
  },
  {
    path: 'finalizar-proceso',
    component: EndProcessComponent,
  },
  {
    path: 'verificar-pagos',
    component: VerifyDataComponent,
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
