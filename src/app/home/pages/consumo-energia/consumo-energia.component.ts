import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowRight, faArrowRightFromBracket, faBolt, faChartPie, faHouseUser, faUser, faLightbulb, faPlugCircleCheck, faPlugCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, onValue, ref, set, get, child } from '@angular/fire/database';
import { User } from 'src/app/auth/interfaces/cliente.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-consumo-energia',
  templateUrl: './consumo-energia.component.html',
  styleUrls: ['./consumo-energia.component.css']
})
export class ConsumoEnergiaComponent implements OnInit {
  /*variables*/
  uidCliente: string | undefined | null;
  /* spinner variable */
  spinner!: boolean;
  /* declaracion del obejto user */
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

  /* formulario cuarto uno */
  formularioConsumoCuartoUno: FormGroup = this.fb.group({
    switchConcector: [this.datosCliente.conectores[0].switch],
    switchFoco: [this.datosCliente.focos[0].switch],
  })
  /* formulario cuarto dos */
  formularioConsumoCuartoDos: FormGroup = this.fb.group({
    switchCuartoDos: [this.datosCliente.focoConector[0].switch],
  })
  /* formulario cuarto tres */
  formularioConsumoCuartoTres: FormGroup = this.fb.group({
    switchCuartoTres: [this.datosCliente.focoConector[1].switch],
  })
  formularioConsumoCuartoCuatro: FormGroup = this.fb.group({
    switchCuartoCuatro: [this.datosCliente.focoConector[2].switch],
  })
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private database: Database,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.spinner = true;
      console.log(user);
      if (user?.uid) {
        this.uidCliente = user?.uid
        console.log(this.uidCliente);
        const starCountRef = ref(this.database, 'users/' + this.uidCliente);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          this.datosCliente = data;
          console.log(this.datosCliente);
          this.spinner = false;
        })

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
  lighbulb = faLightbulb;
  plugCircleCheck = faPlugCircleCheck;
  plugCircleXmark = faPlugCircleXmark;

  /* para editar el switch del cuarto uno */
  guardar() {
    /* declaracion de objeto de los switches */
    var switchConector = this.formularioConsumoCuartoUno.value.switchConcector;
    var switchFoco = this.formularioConsumoCuartoUno.value.switchFoco;
    console.log(switchConector + "---" + switchFoco);
    /* llamar el service para editar el switch*/
    this.homeService.updateSwitch(this.uidCliente!, switchConector, switchFoco);

    console.log(this.formularioConsumoCuartoUno.value);
  }
  /* para editar el switch del cuarto dos */
  guardarCuartoDos() {
    /* declaracion de objeto de los switches */
    var switchCuartoDos: boolean = this.formularioConsumoCuartoDos.value.switchCuartoDos;
    console.log(switchCuartoDos);
    /* llamar el service para editar el switch*/
    this.homeService.updateSwitchCuartoDos(this.uidCliente!, switchCuartoDos);
    console.log(this.formularioConsumoCuartoDos.value);
  }
   /* para editar el switch del cuarto tres */
  guardarCuartoTres() {
    /* declaracion de objeto de los switches */
    var switchCuartoTres: boolean = this.formularioConsumoCuartoTres.value.switchCuartoTres;
    console.log(switchCuartoTres);
    /* llamar el service para editar el switch*/
    this.homeService.updateSwitchCuartoTres(this.uidCliente!, switchCuartoTres);
    console.log(this.formularioConsumoCuartoTres.value);
  }

  guardarCuartoCuatro() {
    /* declaracion de objeto de los switches */
    var switchCuartoCuatro: boolean = this.formularioConsumoCuartoCuatro.value.switchCuartoCuatro;
    console.log("switch cuatro" + switchCuartoCuatro);
    /* llamar el service para editar el switch*/
    this.homeService.updateSwitchCuartoCuatro(this.uidCliente!, switchCuartoCuatro);
    console.log(this.formularioConsumoCuartoTres.value);
  }

}
