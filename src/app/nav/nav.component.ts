import { navData } from './functions/navData';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { NavData } from './functions/functions';

import { VariablesService } from '../core/services/variables.service';
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
  constructor(private router:Router, private core:VariablesService) {
  }
  ngOnInit(): void {

    this.core.RolObservable.subscribe(async (data)=>{
      NavData(navData, this.nav,data);
    });
    // setTimeout(() => {
    //   if(this.nav.length == 0){
    //     location.reload();
    //   }
    // }, 3000);


  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
  @HostListener('window:scroll')
  onScroll(event:any) {
    const alertaDiv = document.getElementById('alerta');
    if (alertaDiv) {
      console.log('alerta')
    }
  }
}
