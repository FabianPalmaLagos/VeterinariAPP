import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  public userProfile: UserProfile;
  constructor(
    private loadinCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
  this.presentLoading();
  }

  async presentLoading(){
    const loading = await this.loadinCtrl.create({
      message: 'Cargando...',
      duration: 1700
    });
    return await loading.present();
  }

  async logOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }

  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Su nombre',
      inputs: [
        {
          type: 'text',
          name: 'nombre',
          placeholder: 'Su nombre',
          value: this.userProfile.nombre
        }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updateName(data.nombre);
          }
        }
      ]
    });
    return await alert.present();
  }
  async updateApellido(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Su apellido',
      inputs: [
        {
          type: 'text',
          name: 'apellido',
          placeholder: 'Su apellido',
          value: this.userProfile.apellido
        }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updateApellido(data.apellido);
          }
        }
      ]
    });
    return await alert.present();
  }

  
    async updateCalle(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Nombre de la calle',
      inputs: [
        {
          type: 'text',
          name: 'calle',
          placeholder: 'Nombre de la calle',
          value: this.userProfile.calle
        }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updateCalle(data.calle);
          }
        }
      ]
    });
    return await alert.present();
  }
  async updateNCalle(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Número de la calle',
      inputs: [
        {
          type: 'number',
          name: 'nCalle',
          placeholder: 'Número de la calle',
          value: this.userProfile.nCalle
        }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updateNCalle(data.nCalle);
          }
        }
      ]
    });
    return await alert.present();
  }

  async updateComuna(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Nombre de la comuna',
      inputs: [
        {
          type: 'text',
          name: 'comuna',
          placeholder: 'Nombre de la comuna',
          value: this.userProfile.comuna
        }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updateComuna(data.comuna);
          }
        }
      ]
    });
    return await alert.present();
  }

  async updateCiudad(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Nombre de la ciudad',
      inputs: [
        {
          type: 'text',
          name: 'ciudad',
          placeholder: 'Nombre de la ciudad',
          value: this.userProfile.ciudad
        }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updateCiudad(data.ciudad);
          }
        }
      ]
    });
    return await alert.present();
  }

  async updateFono(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Su numero de celular',
      inputs: [
        {
          type: 'text',
          name: 'fono',
          placeholder: 'Su celular',
          value: this.userProfile.fono
        }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updateFono(data.fono);
          }
        }
      ]
    });
    return await alert.present();
  }



  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Su correo nuevo' },
        { name: 'password', placeholder: 'Su contraseña', type: 'password' }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email cambiado correctamente');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          }
        }
      ]
    });
    return await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'oldPassword', placeholder: 'Antigua contraseña', type: 'password' },
        { name: 'newPassword', placeholder: 'Nueva contraseña', type: 'password' }
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    return await alert.present();
  }
}

