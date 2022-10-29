import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: NavComponent,
    children:[
      {path:'', component:HomeComponent},
      {path:'**', redirectTo:''}
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports :[RouterModule]
})
export class HomeRoutingModule { }
