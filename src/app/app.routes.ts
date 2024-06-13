import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './views/login/login.component';



export const routes: Routes = [
  {
    path: 'subir-recibo',
    component: UploadReceiptComponent
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
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
