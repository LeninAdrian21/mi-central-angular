import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormCarritosComponent } from './pages/form-carritos/form-carritos.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {path: 'listado', component: ListadoComponent},
      {path: 'agregar', component: FormCarritosComponent},
      {path: 'editar/:id', component: FormCarritosComponent},
      {path: '**', redirectTo: 'listado'}
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CarritosRoutingModule { }
