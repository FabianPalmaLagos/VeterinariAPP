import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.page.html',
  styleUrls: ['./edit-cita.page.scss'],
})
export class EditCitaPage implements OnInit {
  public userProfile: UserProfile;
  editCita: FormGroup;
  uid: any;
  citas: any;
  minDate: String = '';
  constructor(
    private toastCtrl: ToastController,
    private loadinCtrl: LoadingController,
    private profileService: ProfileService,
    public formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editCita = this.formBuilder.group({
      idCita: [''],
      idDueno: [''],
      fechaCita: ['', Validators.required],
      horaCita: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.minDate = new Date().toISOString();
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
        this.uid = this.route.snapshot.paramMap.get('id');
        this.profileService.getCita(this.userProfile.uid, this.uid).subscribe(data => {
          console.log(data.payload.data(['idDueno']))
          this.editCita.setValue({
            idCita: data.payload.id,
            idDueno: data.payload.data()['idDueno'],
            fechaCita: data.payload.data()['fechaCita'],
            horaCita: data.payload.data()['horaCita']
          })

          this.presentLoading();
        })
      })
    })
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

  editarCita() {
    this.presentLoading();
    const cita: any = {
      idCita: this.editCita.value.idCita,
      idDueno: this.editCita.value.idDueno,
      fechaCita: this.editCita.value.fechaCita,
      horaCita: this.editCita.value.horaCita
    }
    this.profileService.editCita(this.editCita.value.idDueno, this.uid, cita).then(() => {
      this.router.navigate(['/citas'])
    })
    this.presentToast('Cita editada correctamente');
  }

}
