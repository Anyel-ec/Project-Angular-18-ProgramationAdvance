import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/user/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/user/registration-form/registration-form.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './views/admin/page-not-found/page-not-found.component';
import { EndProcessComponent } from './views/admin/end-process/end-process.component';
import { VerifyDataComponent } from './views/admin/verify-data/verify-data.component';
import { LoginComponent } from './views/admin/login/login.component';

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
    path: 'verificar-registros',
    component: VerifyDataComponent,
  },
  {
    path: 'registro-aspirantes',
    component: RegistrationFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/registro-aspirantes',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
