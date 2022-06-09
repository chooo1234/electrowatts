import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConsumoEnergiaComponent } from './pages/consumo-energia/consumo-energia.component';
import { EstadisticaComponent } from './pages/estadistica/estadistica.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { GraficasComponent } from './pages/graficas/graficas.component';



@NgModule({
  declarations: [
    HomeComponent,
    ConsumoEnergiaComponent,
    EstadisticaComponent,
    DatosPersonalesComponent,
    GraficasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class HomeModule { }
