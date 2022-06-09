import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HomeService } from '../../services/home.service';

/* importaciones firebase */
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, onValue, ref, set, get, child } from '@angular/fire/database';
/* interfaces */
import { User } from 'src/app/auth/interfaces/cliente.interface';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  /* variables */
  /* datosCliente = {}
  listDatos!: User[]; */
  datosCliente: User = {
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    focos: [
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      }
    ],
    conectores: [
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      }
    ],
    focoConector: [
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      },
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      },
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      }
    ]
  }
  uidCliente: string | undefined | null;
  emailCliente: string | undefined | null;

  constructor(
    private homeService: HomeService,
    private auth: Auth,
    private database: Database
  ) { }


  ngOnInit(): void {
    /* id del usuario */
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user?.uid) {
        this.uidCliente = user?.uid
        this.emailCliente = user?.email;
        console.log(this.uidCliente);
        /* this.homeService.getDatosCliente(this.uidCliente).snapshotChanges().subscribe(item => {
          this.listDatos = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            this.listDatos.push(x as User);
          }); 
          console.log(this.listDatos);
          
        }); */
        const starCountRef = ref(this.database, 'users/' + this.uidCliente);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          this.datosCliente = data;
          console.log(this.datosCliente);

        })
      }
    })
  }

  passwordUpdate() {
    this.homeService.passwordUpdate(this.emailCliente!);
  }
}
