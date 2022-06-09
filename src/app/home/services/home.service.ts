import { Injectable } from '@angular/core';


import { Database, onValue, ref, set, update, } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Auth, onAuthStateChanged, user, authState } from '@angular/fire/auth';
import { User } from 'src/app/auth/interfaces/cliente.interface';
import Swal from 'sweetalert2';
import { sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  /* variables */
  /*  private dbPath = '/users/'; */
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

  constructor(private database: Database, private auth: Auth, private router: Router, private authService: AuthService) {

  }

  /* terminar sesion de firebase */
  logout() {
    this.auth.signOut();
  }
  /* Actualizar switches cuarto Uno*/
  updateSwitch(userId: String, switchConector1: Boolean, switchFoco1: Boolean) {
    console.log(userId);
    /* recuperamos los valore s de la base de datos */
    const starCountRef = ref(this.database, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.datosCliente = data;
      console.log(this.datosCliente);
    })

    /* actualizamos los datos de los switches */
    update(ref(this.database, 'users/' + userId), {

      nombre: this.datosCliente.nombre,
      apellidos: this.datosCliente.apellidos,
      direccion: this.datosCliente.direccion,
      telefono: this.datosCliente.telefono,
      focos: [
        {
          id: this.datosCliente.focos[0].id,
          switch: switchFoco1,
          nombreCuarto: this.datosCliente.focos[0].nombreCuarto,
          volts: this.datosCliente.focos[0].volts,
          voltsAcumulados: this.datosCliente.focos[0].voltsAcumulados
        }
      ],
      conectores: [
        {
          id: this.datosCliente.conectores[0].id,
          switch: switchConector1,
          nombreCuarto: this.datosCliente.conectores[0].nombreCuarto,
          volts: this.datosCliente.conectores[0].volts,
          voltsAcumulados: this.datosCliente.conectores[0].voltsAcumulados
        }
      ],
      focoConector: [
        {
          id: this.datosCliente.focoConector[0].id,
          switch: this.datosCliente.focoConector[0].switch,
          nombreCuarto: this.datosCliente.focoConector[0].nombreCuarto,
          volts: this.datosCliente.focoConector[0].volts,
          voltsAcumulados: this.datosCliente.focoConector[0].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[1].id,
          switch: this.datosCliente.focoConector[1].switch,
          nombreCuarto: this.datosCliente.focoConector[1].nombreCuarto,
          volts: this.datosCliente.focoConector[1].volts,
          voltsAcumulados: this.datosCliente.focoConector[1].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[2].id,
          switch: this.datosCliente.focoConector[2].switch,
          nombreCuarto: this.datosCliente.focoConector[2].nombreCuarto,
          volts: this.datosCliente.focoConector[2].volts,
          voltsAcumulados: this.datosCliente.focoConector[2].voltsAcumulados
        }
      ]
    }).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  /* Actualizar cuarto dos */
  updateSwitchCuartoDos(userId: String, switchCuartoDos: Boolean) {
    console.log(userId);
    /* recuperamos los valore s de la base de datos */
    const starCountRef = ref(this.database, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.datosCliente = data;
      console.log(this.datosCliente);
    })

    /* actualizamos los datos de los switches */
    update(ref(this.database, 'users/' + userId), {

      nombre: this.datosCliente.nombre,
      apellidos: this.datosCliente.apellidos,
      direccion: this.datosCliente.direccion,
      telefono: this.datosCliente.telefono,
      focos: [
        {
          id: this.datosCliente.focos[0].id,
          switch: this.datosCliente.focos[0].switch,
          nombreCuarto: this.datosCliente.focos[0].nombreCuarto,
          volts: this.datosCliente.focos[0].volts,
          voltsAcumulados: this.datosCliente.focos[0].voltsAcumulados
        }
      ],
      conectores: [
        {
          id: this.datosCliente.conectores[0].id,
          switch: this.datosCliente.focos[0].switch,
          nombreCuarto: this.datosCliente.conectores[0].nombreCuarto,
          volts: this.datosCliente.conectores[0].volts,
          voltsAcumulados: this.datosCliente.conectores[0].voltsAcumulados
        }
      ],
      focoConector: [
        {
          id: this.datosCliente.focoConector[0].id,
          switch: switchCuartoDos,
          nombreCuarto: this.datosCliente.focoConector[0].nombreCuarto,
          volts: this.datosCliente.focoConector[0].volts,
          voltsAcumulados: this.datosCliente.focoConector[0].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[1].id,
          switch: this.datosCliente.focoConector[1].switch,
          nombreCuarto: this.datosCliente.focoConector[1].nombreCuarto,
          volts: this.datosCliente.focoConector[1].volts,
          voltsAcumulados: this.datosCliente.focoConector[1].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[2].id,
          switch: this.datosCliente.focoConector[2].switch,
          nombreCuarto: this.datosCliente.focoConector[2].nombreCuarto,
          volts: this.datosCliente.focoConector[2].volts,
          voltsAcumulados: this.datosCliente.focoConector[2].voltsAcumulados
        }

      ]
    }).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  /* Actualizar cuarto tres */
  updateSwitchCuartoTres(userId: String, switchCuartoTres: Boolean) {
    console.log(userId);
    /* recuperamos los valore s de la base de datos */
    const starCountRef = ref(this.database, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.datosCliente = data;
      console.log(this.datosCliente);
    })

    /* actualizamos los datos de los switches */
    update(ref(this.database, 'users/' + userId), {

      nombre: this.datosCliente.nombre,
      apellidos: this.datosCliente.apellidos,
      direccion: this.datosCliente.direccion,
      telefono: this.datosCliente.telefono,
      focos: [
        {
          id: this.datosCliente.focos[0].id,
          switch: this.datosCliente.focos[0].switch,
          nombreCuarto: this.datosCliente.focos[0].nombreCuarto,
          volts: this.datosCliente.focos[0].volts,
          voltsAcumulados: this.datosCliente.focos[0].voltsAcumulados
        }
      ],
      conectores: [
        {
          id: this.datosCliente.conectores[0].id,
          switch: this.datosCliente.focos[0].switch,
          nombreCuarto: this.datosCliente.conectores[0].nombreCuarto,
          volts: this.datosCliente.conectores[0].volts,
          voltsAcumulados: this.datosCliente.conectores[0].voltsAcumulados
        }
      ],
      focoConector: [
        {
          id: this.datosCliente.focoConector[0].id,
          switch: this.datosCliente.focoConector[0].switch,
          nombreCuarto: this.datosCliente.focoConector[0].nombreCuarto,
          volts: this.datosCliente.focoConector[0].volts,
          voltsAcumulados: this.datosCliente.focoConector[0].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[1].id,
          switch: switchCuartoTres,
          nombreCuarto: this.datosCliente.focoConector[1].nombreCuarto,
          volts: this.datosCliente.focoConector[1].volts,
          voltsAcumulados: this.datosCliente.focoConector[1].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[2].id,
          switch: this.datosCliente.focoConector[2].switch,
          nombreCuarto: this.datosCliente.focoConector[2].nombreCuarto,
          volts: this.datosCliente.focoConector[2].volts,
          voltsAcumulados: this.datosCliente.focoConector[2].voltsAcumulados
        }

      ]
    }).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  /* Actualizar cuarto Cuatro */
  updateSwitchCuartoCuatro(userId: String, switchCuartoCuatro: Boolean) {
    console.log(userId);
    /* recuperamos los valore s de la base de datos */
    const starCountRef = ref(this.database, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.datosCliente = data;
      console.log(this.datosCliente);
    })

    /* actualizamos los datos de los switches */
    update(ref(this.database, 'users/' + userId), {

      nombre: this.datosCliente.nombre,
      apellidos: this.datosCliente.apellidos,
      direccion: this.datosCliente.direccion,
      telefono: this.datosCliente.telefono,
      focos: [
        {
          id: this.datosCliente.focos[0].id,
          switch: this.datosCliente.focos[0].switch,
          nombreCuarto: this.datosCliente.focos[0].nombreCuarto,
          volts: this.datosCliente.focos[0].volts,
          voltsAcumulados: this.datosCliente.focos[0].voltsAcumulados
        }
      ],
      conectores: [
        {
          id: this.datosCliente.conectores[0].id,
          switch: this.datosCliente.focos[0].switch,
          nombreCuarto: this.datosCliente.conectores[0].nombreCuarto,
          volts: this.datosCliente.conectores[0].volts,
          voltsAcumulados: this.datosCliente.conectores[0].voltsAcumulados
        }
      ],
      focoConector: [
        {
          id: this.datosCliente.focoConector[0].id,
          switch: this.datosCliente.focoConector[0].switch,
          nombreCuarto: this.datosCliente.focoConector[0].nombreCuarto,
          volts: this.datosCliente.focoConector[0].volts,
          voltsAcumulados: this.datosCliente.focoConector[0].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[1].id,
          switch: this.datosCliente.focoConector[1].switch,
          nombreCuarto: this.datosCliente.focoConector[1].nombreCuarto,
          volts: this.datosCliente.focoConector[1].volts,
          voltsAcumulados: this.datosCliente.focoConector[1].voltsAcumulados
        },
        {
          id: this.datosCliente.focoConector[2].id,
          switch: switchCuartoCuatro,
          nombreCuarto: this.datosCliente.focoConector[2].nombreCuarto,
          volts: this.datosCliente.focoConector[2].volts,
          voltsAcumulados: this.datosCliente.focoConector[2].voltsAcumulados
        }

      ]
    }).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  /* cambiar de constraseña */
  passwordUpdate(email: string) {
    sendPasswordResetEmail(this.auth, email).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha enviado un link a su correo electronico para actualizar su constraseña',
        confirmButtonText: 'okay',
      }).then((result) => {
        /* ir a login */
        localStorage.removeItem("id");
        this.authService.removeUsuarioConectado();
        this.logout();
        this.router.navigate(['auth/login']);
      })
    }).catch((error) => {
      console.log(error);

    })
  }

  /* cambiar de email */
  /* emailUpdate(email: string) {
    sendPasswordResetEmail(this.auth, email).then(() => {

    }).catch((error) => {
      console.log(error);

    })
  } */
}