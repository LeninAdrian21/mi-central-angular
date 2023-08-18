import { navData } from './functions/navData';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { NavData } from './functions/functions';

import { VariablesService } from '../core/services/variables.service';
import { CrudService } from '../services/crud.service';
import { Mensaje } from 'src/functions/functions';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // private data$:Observable<any>;
  navData: any[] = navData;
  nav:any[] = [];
  decoded:any;
  GetRol:any[] = [];
  token: any = localStorage.getItem('refresh');
  constructor(private router:Router, private core:VariablesService, private service: CrudService) {
  }
  ngOnInit(): void {
    this.core.RolObservable.subscribe(async (data) => {
      if (  typeof data === 'string') {
        const response:any = await this.service.get('tipo-rols/' + data, localStorage.getItem('token')!).toPromise();
          NavData(navData, this.nav,response.rol);
      }
    });
  }
  Logout() {
    this.service.get('usuarios/session_out',this.token).subscribe(data => {
      console.log(data);
      Mensaje('Se a iniciado session correctamente','success')
      setTimeout(() => {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }, 4000);
    },
    (error) => {
      console.log(error);
      Mensaje('Error al cerrar session')
    })
  }
  @HostListener('window:scroll')
  onScroll(event:any) {
    const alertaDiv = document.getElementById('alerta');
    if (alertaDiv) {
      console.log('alerta')
    }
  }
}
