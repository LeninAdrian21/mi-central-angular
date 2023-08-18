import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';

import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { FormCreditosComponent } from './pages/form-creditos/form-creditos.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {path: 'listado', component: ListadoComponent},
      {path: 'agregar', component: FormCreditosComponent},
      {path: 'editar/:id', component: FormCreditosComponent},
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
export class CreditosRoutingModule { }
