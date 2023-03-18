import { navData } from './functions/navData';
import { Component, OnInit } from '@angular/core';
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
  mensaje:any;
  decoded:any;
  GetRol:any[] = [];
  constructor(private router:Router, private core:VariablesService) {

  }
  ngOnInit(): void {
    this.core.RolObservable.subscribe((data)=>{
      console.log(data);
      NavData(navData, this.nav,data);
    });
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
