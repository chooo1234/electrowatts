import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumoEnergiaComponent } from './pages/consumo-energia/consumo-energia.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { EstadisticaComponent } from './pages/estadistica/estadistica.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'consumo-energia', component: ConsumoEnergiaComponent},
      { path: 'estadistica', component: EstadisticaComponent },
      { path: 'datos-personales', component: DatosPersonalesComponent },
      { path: '**', redirectTo: 'consumo-energia' }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
