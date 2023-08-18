import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { TipoRolRoutingModule } from './tipo-rol-routing.module';



@NgModule({
  declarations: [
    ListadoComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    TipoRolRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class TipoRolModule { }
