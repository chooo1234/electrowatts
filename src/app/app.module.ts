import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HomeService } from './home/services/home.service';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from "@angular/common/http";




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    /* AngularFireModule.initializeApp(environment.firebaseConfig), *//* conexion a la app */
    /* AngularFireAuthModule, *//* Para autenticacion */
    /* AngularFireDatabaseModule, */ /* Para la base de datos (RealtimeDatabase) */
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    provideDatabase(() => getDatabase()),
    SweetAlert2Module.forRoot(),
    NgChartsModule,
    HttpClientModule

  ],
  providers: [
    AuthService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
