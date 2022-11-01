import { VariablesService } from './../core/service/variables.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {
  private data$:Observable<any>;
  public rol:any;
  constructor(private variables:VariablesService){
    this.data$ = variables.DataValidatorObservable;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      localStorage.setItem('access', 'false' );
      this.data$.subscribe(data=>{
        this.rol = data.rol;
      })
      if(this.rol === 'Administrator'){
        localStorage.setItem('access', 'true')
      }
    return true
  }

}
