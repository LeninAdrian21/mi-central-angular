import { navData } from './../../functions/navData';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navData: any[] = navData;
  constructor(private router:Router) { }
  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);

  }
}
