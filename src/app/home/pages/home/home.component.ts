import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faArrowRightFromBracket, faBolt, faChartPie, faCoffee, faHouseUser, faLightbulb, faUser, IconLookup, IconPack } from '@fortawesome/free-solid-svg-icons';
import { arrow } from '@popperjs/core';
import { Authh } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HomeService } from '../../services/home.service';
import { Database, onValue, ref, set } from '@angular/fire/database';
import { Auth, onAuthStateChanged, user, authState } from '@angular/fire/auth';
import { User } from 'src/app/auth/interfaces/cliente.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  /* varibales globales */
  /* id del cliente */
  uidCliente: string | undefined | null;
  emailCliente: string | undefined | null;
  /* obejto para id */
  authUser: Authh = {
    id: "",
    email: "",
    password: ""
  }
  datosCliente: User = {
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    focos: [
      {
        id: 1,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      }
    ],
    conectores: [
      {
        id: 1,
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



  constructor(
    private router: Router,
    private authService: AuthService,
    private homeService: HomeService,
    private auth: Auth,
    private database: Database
  ) { }

  ngOnInit(): void {


    this.auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user?.uid) {
        this.uidCliente = user?.uid
        this.emailCliente = user?.email;

      }
    })

  }

  /* iconos awesome */
  flechaDerecha = faArrowRight;
  usuario = faUser;
  salir = faArrowRightFromBracket;
  houseUser = faHouseUser;
  chartPie = faChartPie;
  bolt = faBolt;

  /* logout de home*/
  salirLogin() {
    this.homeService.logout();
    localStorage.removeItem("id");
    this.authService.removeUsuarioConectado();
    this.router.navigate(['./auth']);
  }

  /* datosPesononales del cliente */

  onDatosPersonales() {
    /* this.router.navigate(['./datos-personales']) */
    /* this.homeService.datosPersonalesCliente(this.uidCliente!); */

    this.router.navigate(['./home/datos-personales']);
  }


}
