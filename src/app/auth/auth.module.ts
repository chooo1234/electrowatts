import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContenedorComponent } from './pages/contenedor/contenedor.component';
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [
    LoginComponent,
    RecuperarPasswordComponent,
    ContenedorComponent,
    RegistroClienteComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class AuthModule { }
