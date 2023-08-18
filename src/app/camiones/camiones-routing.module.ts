import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

import { ListadoComponent } from './pages/listado/listado.component';
import { FormCamionesComponent } from './pages/form-camiones/form-camiones.component';

const routes: Routes = [
  {
    path:'',
    component:NavComponent,
    children:[
      {path:'listado', component:ListadoComponent},
      {path:'agregar', component:FormCamionesComponent},
      {path:'editar/:id', component:FormCamionesComponent},
      {path: '**', redirectTo: 'listado'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamionesRoutingModule { }
