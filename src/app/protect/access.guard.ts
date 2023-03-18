import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const access = localStorage.getItem('access');
    if(access === 'true'){
      return true
    }
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No tienes permiso en esta ruta',
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['/home']);
    return false
  }

}
