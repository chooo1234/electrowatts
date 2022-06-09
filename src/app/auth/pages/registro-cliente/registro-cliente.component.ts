import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/cliente.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {


  fRegistrarCliente: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    direccionDomicilio: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],


  })
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  /* validar los campos dependiendo del argumento de la funcion */
  /* validacion de de campos vacios hacia el formulario*/
  required(campo: string) {
    return this.fRegistrarCliente.controls[campo].errors?.['required']
      && this.fRegistrarCliente.controls[campo].touched
  }
  /* validacion del largo de texto de telefono */
  minLengthTel(campoTel: string) {
    return this.fRegistrarCliente.controls[campoTel].errors?.['minlength']
      && this.fRegistrarCliente.controls[campoTel].touched
  }
  maxLengthTel(campoTel: string) {
    return this.fRegistrarCliente.controls[campoTel].errors?.['maxlength']
      && this.fRegistrarCliente.controls[campoTel].touched
  }
  /* validacion del email */
  validarEmail(campoEmail: string) {
    return this.fRegistrarCliente.controls[campoEmail].errors?.['email']
      && this.fRegistrarCliente.controls[campoEmail].touched
  }
  /* validacion del largo de texto de password */
  minLength(campoPassword: string) {
    return this.fRegistrarCliente.controls[campoPassword].errors?.['minlength']
      && this.fRegistrarCliente.controls[campoPassword].touched
  }

  /* varibale para saber si el email esta en uso */
  emailExiste?: boolean;
  /* boton para guardar el cliente o usuario */
  guardarCliente() {
    const user: User = {
      nombre: this.fRegistrarCliente.value.nombre,
      apellidos: this.fRegistrarCliente.value.apellidos,
      direccion: this.fRegistrarCliente.value.direccionDomicilio,
      telefono: this.fRegistrarCliente.value.telefono,
      email: this.fRegistrarCliente.value.email,
      password: this.fRegistrarCliente.value.password,
      focos: [
        {
          id: 1,
          switch: false,
          nombreCuarto: "Cuarto Uno",
          volts: 0,
          voltsAcumulados: 0
        }
      ],
      conectores: [
        {
          id: 1,
          switch: false,
          nombreCuarto: "Cuarto Uno",
          volts: 0,
          voltsAcumulados: 0
        },
      ],
      focoConector:[
        {
          id: 1,
          switch: false,
          nombreCuarto: "Cuarto Uno",
          volts: 0,
          voltsAcumulados: 0
        },
        {
          id: 2,
          switch: false,
          nombreCuarto: "Cuarto Dos",
          volts: 0,
          voltsAcumulados: 0
        },
        {
          id: 3,
          switch: false,
          nombreCuarto: "Cuarto Tres",
          volts: 0,
          voltsAcumulados: 0
        }
      ]
    }
    if (this.fRegistrarCliente.invalid) {
      /* para tocar otdos los campoos y asi apreciar los errores del formulario al usuario */
      this.fRegistrarCliente.markAllAsTouched();
      return;
    }
    console.log(user);
    this.authService.registroCliente(user);
    /* traer el valor booleano si existe el usuario 
    medinate el metodo getEmialexiste del service */
    /* this.authService.getEmailExiste().then((res) => {
      this.emailExiste = res;
      console.log(this.emailExiste);
      
    }) */
    
  }
}
