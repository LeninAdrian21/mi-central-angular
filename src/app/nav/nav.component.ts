import { Observable } from 'rxjs';
import { VariablesService } from './../core/service/variables.service';
import { navData } from './../../functions/navData';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavData } from 'src/functions/functions';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private data$:Observable<any>;
  navData: any[] = navData;
  public rol:any;
  nav:any[] = [];
  mensaje:any;
  constructor(private router:Router, private varibles:VariablesService) {
    this.data$ = varibles.DataValidatorObservable;
  }
  ngOnInit(): void {
    localStorage.setItem('carga','false');
    this.data$.subscribe(data=>{
      this.rol = data.rol;
    })
    console.log(this.rol);
    NavData(navData, this.nav,this.rol);
    console.log(this.nav);
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
