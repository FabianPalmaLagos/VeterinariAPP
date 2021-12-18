import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/app/models/user';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.page.html',
  styleUrls: ['./registro-mascota.page.scss'],
})
export class RegistroMascotaPage implements OnInit {
  public userProfile: UserProfile;
  
  mascota: any;
  mascotas:any;
  insertar: { idDueno: string, nombreMascota: string; edadMascota: string; tipoEdad: string; pesoMascota: string; tipoMascota: string; estado: string; };
  
  constructor(
    private toastCtrl: ToastController,
    private profileService: ProfileService,
    private firestore: AngularFirestore,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit() {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
    
    this.insertar = { idDueno: '', nombreMascota: '', edadMascota: '', tipoEdad: '', pesoMascota: '', tipoMascota: '', estado: '' };
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  
  insertarMascota(idDueno, nombreMascota, edadMascota, tipoEdad, pesoMascota, tipoMascota, estado) {
    estado = 'Vigente';
    let insertar = {}
    insertar['idDueno'] = idDueno
    insertar['nombreMascota'] = nombreMascota
    insertar['edadMascota'] = edadMascota
    insertar['tipoEdad'] = tipoEdad
    insertar['pesoMascota'] = pesoMascota
    insertar['tipoMascota'] = tipoMascota
    insertar['estado'] = estado

    this.firestore.collection(`userProfile/${this.userProfile.uid}/mascotas`).add(insertar).then(() => {
      this.insertar = { idDueno:'', nombreMascota: '', edadMascota: '', tipoEdad: '', pesoMascota: '', tipoMascota: '', estado: '' }
    })
    this.router.navigateByUrl('mascotas');
    this.presentToast('Mascota agregada correctamente');
  }

}
