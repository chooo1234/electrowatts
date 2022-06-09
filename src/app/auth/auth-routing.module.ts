import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContenedorComponent } from './pages/contenedor/contenedor.component';
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';

const routes: Routes = [
  {
    path: '',
    component: ContenedorComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro-cliente',
        component: RegistroClienteComponent
      },
      {
        path: 'recuperar-password',
        component: RecuperarPasswordComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
