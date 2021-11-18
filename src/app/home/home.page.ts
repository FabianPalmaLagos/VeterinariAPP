import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { UserProfile } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  doc: any;
  usuario: string;
  userprofile: { 
    id: string; 
    nombre: string;
  }[];

  public userProfile: UserProfile;


  constructor(private menu: MenuController, 
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    //private profileService: ProfileService,
    private alertCtrl: AlertController,
    public toastController: ToastController,
) { }


  ngOnInit() {
    /*this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
        
        // metodo asincronico
        
        this.usuario = userProfile.fullName;*/

  }

}
