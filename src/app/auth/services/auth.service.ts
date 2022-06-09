import { Injectable } from '@angular/core';
/* interfaces */

/* importaciones de firebase */
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged, user } from '@angular/fire/auth';
import { Database, onValue, ref, set, update, remove } from '@angular/fire/database';
import Swal from 'sweetalert2';
import { User } from '../interfaces/cliente.interface';
import { Router } from '@angular/router';
import { Authh } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../interfaces/tiempo.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private auth: Auth,
    private database: Database,
    private router: Router,
    private http: HttpClient
  ) { }

  /* observable */
  /* verificarAuth(): Observable<> {
  
  } */
  /* Verificar autenticacion en el storage */
  /*   verificarAuth(): Observable<boolean> {
      let bool: boolean;
      if (!localStorage.getItem('token')) {
        return of(false);
      } */
  /* return of(true); */
  /* const starCountRef = ref(this.database, 'users/' + localStorage.getItem('token'));
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  }); */

  /*   } */
  /* Autenticacion de correo y password */
  async login(authh: Authh) {
    try {
      const resultado = signInWithEmailAndPassword(this.auth, authh.email, authh.password);
      return resultado;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  /* registrar un nuevo usuario o cliente */
  registroCliente(user: User) {
    fetchSignInMethodsForEmail(this.auth, user.email).then((res) => {
      console.log(res);
      /* validacion si ya existre el correo */
      if (res[0] === "password") {
        /* notifiacion cuando el corre ya esta en uso */
        Swal.fire({
          icon: 'error',
          title: `${user.email}`,
          text: 'Ya esta en uso',
        })

      } else {
        createUserWithEmailAndPassword(this.auth, user.email, user.password)
          .then((informacionCliente) => {
            const userId = informacionCliente.user.uid;
            console.log(userId);

            /* llevar los datos registrados hacia la BD con el id que se recibe de firebase */
            set(ref(this.database, 'users/' + userId), {
              nombre: user.nombre,
              apellidos: user.apellidos,
              direccion: user.direccion,
              telefono: user.telefono,
              focos: [
                {
                  id: user.focos[0].id,
                  switch: user.focos[0].switch,
                  nombreCuarto: user.focos[0].nombreCuarto,
                  volts: user.focos[0].volts,
                  voltsAcumulados: user.focos[0].voltsAcumulados
                }
              ],
              conectores: [
                {
                  id: user.conectores[0].id,
                  switch: user.conectores[0].switch,
                  nombreCuarto: user.conectores[0].nombreCuarto,
                  volts: user.conectores[0].volts,
                  voltsAcumulados: user.conectores[0].voltsAcumulados
                }
              ],
              focoConector: [
                {
                  id: user.focoConector[0].id,
                  switch: user.focoConector[0].switch,
                  nombreCuarto: user.focoConector[0].nombreCuarto,
                  volts: user.focoConector[0].volts,
                  voltsAcumulados: user.focoConector[0].voltsAcumulados
                },
                {
                  id: user.focoConector[1].id,
                  switch: user.focoConector[1].switch,
                  nombreCuarto: user.focoConector[1].nombreCuarto,
                  volts: user.focoConector[1].volts,
                  voltsAcumulados: user.focoConector[1].voltsAcumulados
                },
                {
                  id: user.focoConector[2].id,
                  switch: user.focoConector[2].switch,
                  nombreCuarto: user.focoConector[2].nombreCuarto,
                  volts: user.focoConector[2].volts,
                  voltsAcumulados: user.focoConector[2].voltsAcumulados
                }
              ]
            })
            /* Notificación del cliente creado*/
            /* Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente creado exitosamente!!',
              showConfirmButton: true,
              timer: 1500
            }) */
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente creado exitosamente!!',
              confirmButtonText: 'okay',
            }).then((result) => {
              /* ir a login */
              this.router.navigate(['/login']);
            })
          }).catch((error) => {
            console.log(error);
            const errorCode = error.code;;
            console.log(errorCode);
            /* validacdion si ya existe el email dado por usuario */
          })

      }

    })

  }
  /* actualizar el cliente conectado*/
  clienteConectado(uidCliente: string) {
    update(ref(this.database, 'usuarioConectado/'), {
      usuarioConectado: uidCliente
    })
  }
  /* Tiempo */
  /* Traer categorias */
  getTiempo():Observable<Tiempo> {
    return this.http.get<Tiempo>('http://worldtimeapi.org/api/timezone/America/Mexico_City');
  }

  removeUsuarioConectado(){
    remove(ref(this.database, 'usuarioConectado/'));
  }

}
