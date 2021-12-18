import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  citas: any;
  public userProfile: UserProfile;
  id: any;
  constructor(
    private toastCtrl: ToastController,
    private loadinCtrl: LoadingController,
    private firestore: AngularFirestore,
    private profileService: ProfileService
  ) { }

  ngOnInit() {

    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;

        this.firestore.collection(`userProfile/${userProfile.uid}/citas/`, ref => ref.where('estado', '==', 'Vigente'))
          .snapshotChanges().subscribe(data => {
            this.citas = data.map(e => {
              return {
                idCita: e.payload.doc.id,
                nombreMascota: e.payload.doc.data()['nombreMascota'],
                fechaCita: e.payload.doc.data()['fechaCita'],
                horaCita: e.payload.doc.data()['horaCita'],
                estado: e.payload.doc.data()['estado']
              }// fin return
            })//fin map
          })//fin subscribe data
      }) // fin subscribe userProfile
    }) // fin then

    this.presentLoading();
  } //fin ngoninit 

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

  eliminarCita(id, estado = null) {
    estado = 'Baja';
    this.presentLoading();
    console.log('Cita dada de baja')
    let insertar = {}
    this.id = id;
    insertar['estado'] = estado
    this.firestore.doc(`userProfile/${this.userProfile.uid}/citas/${this.id}`).update(insertar).then(() => {
  this.presentToast('Cita eliminada correctamente');
    })
  }
}
