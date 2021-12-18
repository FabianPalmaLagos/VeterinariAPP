import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/auth';
import { Citas, Mascotas, UserProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userProfile: AngularFirestoreDocument<UserProfile>;
  /* 
  private Citas: AngularFirestoreDocument<Citas>;
  private mascotasProfile: AngularFirestoreDocument<Mascotas>;
 */
  private currentUser: firebase.User;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  async getUserProfile(): Promise<Observable<UserProfile>> {
    const user: firebase.User = await this.authService.getUser();
    this.currentUser = user;
    this.userProfile = this.firestore.doc(`userProfile/${user.uid}`);
    return this.userProfile.valueChanges();
  }
 
  getMascota(id, idMascota):Observable<any>{
    return this.firestore.collection(`userProfile/${id}/mascotas/`).doc(idMascota).snapshotChanges();
  }

  editMascota(id, idMascota, data:any): Promise<any>{
    return this.firestore.collection(`userProfile/${id}/mascotas`).doc(idMascota).update(data);
  }
  
  getCita(id, idCita):Observable<any>{
    return this.firestore.collection(`userProfile/${id}/citas/`).doc(idCita).snapshotChanges();
  }

  editCita(id, idCita, data:any): Promise<any>{
    return this.firestore.collection(`userProfile/${id}/citas`).doc(idCita).update(data);
  }


 /*  mascotas(id){
    return this.firestore.collection(`userProfile/${id}/mascotas`).snapshotChanges();  
  }
  async editMascotas(id, idMascota): Promise<Observable<Mascotas>>{
    this.mascotasProfile = this.firestore.collection(`userProfile/${id}/mascotas/`).doc(idMascota);
    return this.mascotasProfile.valueChanges();
  } */


  /* citas(id){
    return this.firestore.collection(`userProfile/${id}/citas`).snapshotChanges();  
  }
 */

  updateName(nombre: string): Promise<void> {
    return this.userProfile.update({ nombre });
  }


  updateApellido(apellido: string): Promise<void> {
    return this.userProfile.update({ apellido });
  }

  updateCalle(calle: string): Promise<void> {
    return this.userProfile.update({ calle });
  }

  updateNCalle(nCalle: number): Promise<void> {
    return this.userProfile.update({ nCalle });
  }

  updateComuna(comuna: string): Promise<void> {
    return this.userProfile.update({ comuna });
  }

  updateCiudad(ciudad: string): Promise<void> {
    return this.userProfile.update({ ciudad });
  }

  updateFono(fono: string): Promise<void> {
    return this.userProfile.update({ fono });
  }
  
  async updateEmail(newEmail: string, password: string): Promise<void> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    try {
      await this.currentUser.reauthenticateWithCredential(credential);
      await this.currentUser.updateEmail(newEmail);
      return this.userProfile.update({ email: newEmail });
    } catch (error) {
      console.error(error);
    }
  }

  async updatePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<void> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
    try {
      await this.currentUser.reauthenticateWithCredential(credential);
      return this.currentUser.updatePassword(newPassword);
    } catch (error) {
      console.error(error);
    }
  }
}
