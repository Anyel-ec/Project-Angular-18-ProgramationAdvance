import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/user/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/user/registration-form/registration-form.component';
import { Component, NgModule } from '@angular/core';
import { PageNotFoundComponent } from './views/admin/page-not-found/page-not-found.component';
import { EndProcessComponent } from './views/admin/end-process/end-process.component';
import { VerifyDataComponent } from './views/admin/verify-data/verify-data.component';
import { LoginComponent } from './views/admin/login/login.component';
import path from 'node:path';
import { error } from 'node:console';
import { Error404Component } from './errors/error-404/error-404.component';


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
    path: 'not',
    component: PageNotFoundComponent,
  },
  {
    path: 'error-404',
    component: Error404Component,
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
