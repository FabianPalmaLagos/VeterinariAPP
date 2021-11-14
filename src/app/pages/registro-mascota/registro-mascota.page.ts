import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.page.html',
  styleUrls: ['./registro-mascota.page.scss'],
})
export class RegistroMascotaPage implements OnInit {

  mascota: any;
  insertar: { nombreMascota: string; edadMascota: string; tipoEdad: string; pesoMascota: string; tipoMascota: string; };

  constructor(
    private firestore: AngularFirestore,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.insertar = { nombreMascota: '', edadMascota: '', tipoEdad: '', pesoMascota: '', tipoMascota: '' };
  }

  insertarMascota(nombreMascota, edadMascota, tipoEdad, pesoMascota, tipoMascota) {

    let insertar = {}
    insertar['nombreMascota'] = nombreMascota
    insertar['edadMascota'] = edadMascota
    insertar['tipoEdad'] = tipoEdad
    insertar['pesoMascota'] = pesoMascota
    insertar['tipoMascota'] = tipoMascota

    this.firestore.collection('/mascota/').add(insertar).then(() => {
      this.insertar = { nombreMascota: '', edadMascota: '', tipoEdad: '', pesoMascota: '', tipoMascota: '' }
    })
    this.router.navigateByUrl('home');
  }

}
