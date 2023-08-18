import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate, CanLoad {
  constructor(private router:Router) { }
  canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.hasRole(route);
  }
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasRole(route);
  }
  private hasRole(route: Route | ActivatedRouteSnapshot){
    // // const rol = localStorage.getItem('rol');
    //   const roles = route.data?.['AllRoles'];
    //   if(roles.includes(rol)){
    //     return true;
    //   }else{
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Acceso denegado'
    //     })
    //     this.router.navigate(['/home']);
    //     return false;
    //   }
    return true
  }
}
