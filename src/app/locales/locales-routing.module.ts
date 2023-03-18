import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormLocalesComponent } from './pages/form-locales/form-locales.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {path: 'listado', component: ListadoComponent},
      {path: 'agregar', component: FormLocalesComponent},
      {path: 'editar/:id', component: FormLocalesComponent},
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
export class LocalesRoutingModule { }
