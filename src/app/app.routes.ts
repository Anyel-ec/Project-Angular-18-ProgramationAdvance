import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/user/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/user/registration-form/registration-form.component';
import { Component, NgModule } from '@angular/core';
import { EndProcessComponent } from './views/admin/end-process/end-process.component';
import { VerifyDataComponent } from './views/admin/verify-data/verify-data.component';
import { LoginComponent } from './views/admin/login/login.component';
import path from 'node:path';
import { error } from 'node:console';
import { Error404Component } from './errors/error-404/error-404.component';

import { EndProcessEmailSuccessComponent } from './emails/end-process-email-success/end-process-email-success.component';
import { RegistrationFormEmailComponent } from './emails/registration-form-email/registration-form-email.component';
import { VerifyDataSuccessComponent } from './emails/verify-data-success/verify-data-success.component';
import { VerifyDataDeniedComponent } from './emails/verify-data-denied/verify-data-denied.component';
import { EndProcessEmailDeniedComponent } from './emails/end-process-email-denied/end-process-email-denied.component';
import { Error403Component } from './errors/error-403/error-403.component';
import { Error500Component } from './errors/error-500/error-500.component';


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
    path: '1',
    component: RegistrationFormEmailComponent,
  },
  {
    path: '2',
    component: VerifyDataSuccessComponent,
  },
  {
    path: '3',
    component: VerifyDataDeniedComponent,
  },
  {
    path: '4',
    component: EndProcessEmailSuccessComponent,
  },
  {
    path: '5',
    component: EndProcessEmailDeniedComponent,
  },
  {
    path: '',
    redirectTo: '/registro-aspirantes',
    pathMatch: 'full',
  },
  {
    path: 'error-404',
    component: Error404Component,
  },
  {
    path: 'error-403',
    component: Error403Component,
  },
  {
    path: 'error-500',
    component: Error500Component,
  },
  { path: '**', 
    redirectTo: '/error-404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
