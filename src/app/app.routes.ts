import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { NgModule } from '@angular/core';



export const routes: Routes = [
  {
    path: 'subir-recibo',
    component: UploadReceiptComponent
  },
  {
    path: 'registro-aspirantes',
    component: RegistrationFormComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
