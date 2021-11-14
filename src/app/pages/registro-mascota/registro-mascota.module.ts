import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistroMascotaPage } from './registro-mascota.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroMascotaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistroMascotaPage]
})
export class RegistroMascotaPageModule {}
