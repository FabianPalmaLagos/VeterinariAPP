import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.page.html',
  styleUrls: ['./registro-cita.page.scss'],
})
export class RegistroCitaPage implements OnInit {

  startDate:String = '';
  minDate:String = '';
  maxDate:String = ''

  cita: any;
  agendar: { nombreMascota: string, fechaCita: string, horaCita: string};

  constructor(
    private firestore: AngularFirestore,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.startDate = new Date().toISOString();
    this.minDate = new Date().toISOString();
    this.agendar = { nombreMascota: '', fechaCita: '', horaCita: ''};
  }

  agendarCita(nombreMascota, fechaCita, horaCita) {

    let agendar = {}
    agendar['nombreMascota'] = nombreMascota
    agendar['fechaCita'] = fechaCita
    agendar['horaCita'] = horaCita
   
    this.firestore.collection('/cita/').add(agendar).then(() => {
      this.agendar = { nombreMascota: '', fechaCita: '', horaCita: '' }
    })
    this.router.navigateByUrl('home');
  }

}
