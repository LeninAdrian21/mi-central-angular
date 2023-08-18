
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {

  public rol:any;
  constructor(){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      localStorage.setItem('access', 'false' );
      this.rol = localStorage.getItem('rol');
      if(this.rol === 'Administrator'){
        localStorage.setItem('access', 'true')
      }
    return true
  }

}
