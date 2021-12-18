import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-mascota',
  templateUrl: './edit-mascota.page.html',
  styleUrls: ['./edit-mascota.page.scss'],
})
export class EditMascotaPage implements OnInit {
  public userProfile: UserProfile;
  editMascota: FormGroup;
  uid: any;
  mascotas: any;
  constructor(
    private toastCtrl: ToastController,
    private loadinCtrl: LoadingController,
    private profileService: ProfileService,
    public formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editMascota = this.formBuilder.group({
      idMascota: [''],
      idDueno: [''],
      nombreMascota: ['', Validators.required],
      edadMascota: ['', Validators.required],
      tipoEdad: ['', Validators.required],
      pesoMascota: ['', Validators.required],
      tipoMascota: ['', Validators.required]
    })
  }
  // this.firestore.doc(`userProfile/${this.userProfile.uid}/mascotas/${this.id}`).update(insertar)
  // this.uid = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
        this.uid = this.route.snapshot.paramMap.get('id');
        this.profileService.getMascota(this.userProfile.uid, this.uid).subscribe(data => {
          this.editMascota.setValue({
            idMascota: data.payload.id,
            idDueno: data.payload.data()['idDueno'],
            nombreMascota: data.payload.data()['nombreMascota'],
            edadMascota: data.payload.data()['edadMascota'],
            tipoEdad: data.payload.data()['tipoEdad'],
            pesoMascota: data.payload.data()['pesoMascota'],
            tipoMascota: data.payload.data()['tipoMascota']
          })

          this.presentLoading();
        })
      })
    })
    /*     this.actualizar = { idDueno: '', idMascota: '', nombreMascota: '', edadMascota: '', tipoEdad: '', pesoMascota: '', tipoMascota: '' };
     */
  }

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

  editarMascota() {

    this.presentLoading();
    const mascota: any = {
      idMascota: this.editMascota.value.idMascota,
      idDueno: this.editMascota.value.idDueno,
      nombreMascota: this.editMascota.value.nombreMascota,
      edadMascota: this.editMascota.value.edadMascota,
      tipoEdad: this.editMascota.value.tipoEdad,
      pesoMascota: this.editMascota.value.pesoMascota,
      tipoMascota: this.editMascota.value.tipoMascota
    }
    this.profileService.editMascota(this.editMascota.value.idDueno, this.uid, mascota).then(() => {
      this.router.navigate(['/mascotas'])
    })
    
    this.presentToast('Mascota editada correctamente');
  }
  /* editarMascota(id, nombreMascota, pesoMascota, edadMascota, tipoEdad, tipoMascota){
    console.log('Mascota editada correctamente')
    let actualizar = {}
    this.idMascota = id;
    actualizar['nombreMascota'] = nombreMascota
    actualizar['pesoMascota'] = pesoMascota
    actualizar['edadMascota'] = edadMascota
    actualizar['tipoEdad'] = tipoEdad
    actualizar['tipoMascota'] = tipoMascota

    this.firestore.doc(`userProfile/${this.userProfile.uid}/mascotas/${this.idMascota}`).update(actualizar)
  } */
}
