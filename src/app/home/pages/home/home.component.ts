import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data:any;
  constructor()
  {
    // this.data$ = core.JwtObservable;
    // core.JwtObservable.subscribe((jwt:any)=>{
    //   console.log(jwt)
    //   this.data = jwt
    // });
  }

  ngOnInit(): void {

  }

}
