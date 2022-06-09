import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Authh } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /* usuarioConectado = this.authService.getDatosUsuario(); */
  /* variable globales */
  /* Para mostrar la informacion */
  usuario = false;

  formularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  /* validar los campos dependiendo del argumento de la funcion */
  /* validacion de de campos vacios hacia el formulario*/
  required(campo: string) {
    return this.formularioLogin.controls[campo].errors?.['required']
      && this.formularioLogin.controls[campo].touched
  }
  /* login con firebase con ayuda del service */
  login() {

    const authLogin: Authh = {
      id: '',
      email: this.formularioLogin.value.email,
      password: this.formularioLogin.value.password
    }
    if (this.formularioLogin.invalid) {
      /* para tocar otdos los campoos y asi apreciar los errores del formulario al usuario */
      this.formularioLogin.markAllAsTouched();
      return;
    }
    console.log(this.formularioLogin.value);
    /* si existe algo en res existe el usuario */
    this.authService.login(authLogin).then(res => {
      /* ir a home se se autentifica */
      console.log(res?.user);
      if (res?.user.uid) {
        authLogin.id = res?.user.uid,
          localStorage.setItem("id", res.user.uid);
        /* para saber que usuario se conecto*/
        this.authService.clienteConectado(res.user.uid);
        this.router.navigate(['/home']);
      }
    }).catch((error) => {
      /* si no existe el correo */
      /* reset formulario */
      this.formularioLogin.reset();
      this.usuario = true;
      console.log("errorr");
      console.log(error);

    })
  }

  registrarCliente() {
    this.router.navigate(['/registrar-cliente']);
  }
}
