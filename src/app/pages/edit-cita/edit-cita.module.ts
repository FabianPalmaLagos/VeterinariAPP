import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  
import { IonicModule } from '@ionic/angular';

import { EditCitaPage } from './edit-cita.page';

const routes: Routes = [
  {
    path: '',
    component: EditCitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [EditCitaPage]
})
export class EditCitaPageModule {}
