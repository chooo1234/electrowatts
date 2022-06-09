import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let idTokenCliente = localStorage.getItem("id");
    if (!idTokenCliente) {
      this.router.navigate(['./auth/login']);
      return false; 
    }
    console.log("bloqueado por el AuthGuard - CanLoad");
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    /*  if (this.authService.getDatosUsuario()?.uid) {
       return true
     }
      */

    /* this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.uidCliente = true
        console.log(this.uidCliente);
        this.router.navigate(['./home/']);
        
      }else{
        this.uidCliente = false;
        console.log(this.uidCliente);
        this.router.navigate(['./auth/login']);
      }
    }) */
    let idTokenCliente = localStorage.getItem("id");
    if (!idTokenCliente) {
      this.router.navigate(['./auth/login']);
      console.log("bloqueado por el AuthGuard - CanLoad");
      return false;
    }
    return true;

    /* return this.authService.verificarAuth().pipe(
      tap(estaAutenticado => {
        console.log(estaAutenticado);
        if (estaAutenticado) {
          this.router.navigate(['./auth/login'])
        }
      })
    ) */
  }
}
