import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage implements OnInit {

  mascotas: any;
  public userProfile: UserProfile;
  id: any;


  constructor(
    private toastCtrl: ToastController,
    private loadinCtrl: LoadingController,
    private profileService: ProfileService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;

        this.firestore.collection(`userProfile/${userProfile.uid}/mascotas/`, ref => ref.where('estado', '==', 'Vigente'))
          .snapshotChanges().subscribe(data => {
            this.mascotas = data.map(e => {

              return {
                idMascota: e.payload.doc.id,
                nombreMascota: e.payload.doc.data()['nombreMascota'],
                tipoEdad: e.payload.doc.data()['tipoEdad'],
                tipoMascota: e.payload.doc.data()['tipoMascota'],
                edadMascota: e.payload.doc.data()['edadMascota'],
                pesoMascota: e.payload.doc.data()['pesoMascota'],
                estado: e.payload.doc.data()['estado']

              } // fin return
            }) //fin map
          }) // fin subscribe data
      }) // fin subscribe userProfile
    }) // fin then

    this.presentLoading();
  } // fin ngOnInit

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadinCtrl.create({
      message: 'Cargando...',
      duration: 1700
    });
    return await loading.present();
  }

  eliminarMascota(id, estado = null) {
    estado = 'Baja';
    this.presentLoading();
    console.log('Mascota dada de baja')
    let insertar = {}
    this.id = id;
    insertar['estado'] = estado
    this.firestore.doc(`userProfile/${this.userProfile.uid}/mascotas/${this.id}`).update(insertar)
    this.presentToast('Mascota eliminada correctamente');
  }



}
