import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { FormDimensionesComponent } from './pages/form-dimensiones/form-dimensiones.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {path: 'listado', component: ListadoComponent},
      {path: 'agregar', component: FormDimensionesComponent},
      {path: 'editar/:id', component: FormDimensionesComponent},
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
export class DimensionesRoutingModule { }
