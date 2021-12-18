import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascotas, UserProfile } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.page.html',
  styleUrls: ['./registro-cita.page.scss'],
})
export class RegistroCitaPage implements OnInit { 

  public userProfile: UserProfile;
  public Mascotas: Mascotas;
  startDate: String = '';
  minDate: String = '';
  maxDate: String = '';
  mascotas: any;
  cita: any;
  agendar: { idDueno: string, /* idMascota: string, */ nombreMascota: string, fechaCita: string, horaCita: string, estado: string };
  ingreso: { idDueno: string, /* idMascota: string, */ nombreMascota: string, fechaCita: string, horaCita: string, estado: string }[];
  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
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
            };
          });
        });
      });
    });/* 
    this.profileService.getMascotas().then(mascotas$ =>{
      mascotas$.subscribe(Mascotas =>{
        this.Mascotas = Mascotas;
        console.log(Mascotas)
      })
    }) */
   


    this.startDate = new Date().toISOString();
    this.minDate = new Date().toISOString();
    this.agendar = { idDueno: '', /* idMascota: '' ,*/ nombreMascota: '', fechaCita: '', horaCita: '', estado: '' };
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  agendarCita(idDueno, /* idMascota, */ nombreMascota, fechaCita, horaCita, estado) {
    estado = 'Vigente';
    let agendar = {}
    agendar['idDueno'] = idDueno
    /* agendar['idMascota'] = idMascota */
    agendar['nombreMascota'] = nombreMascota
    agendar['fechaCita'] = fechaCita
    agendar['horaCita'] = horaCita
    agendar['estado'] = estado

    this.firestore.collection(`userProfile/${this.userProfile.uid}/citas`).add(agendar).then(() => {
      this.agendar = { idDueno: '', /* idMascota: '', */ nombreMascota: '', fechaCita: '', horaCita: '', estado: '' }
    })
    this.router.navigateByUrl('citas');
    this.presentToast('Cita agregada correctamente');
  }

}
