import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { AbonosRoutingModule } from './abonos-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarComponent } from './pages/agregar/agregar.component';



@NgModule({
  declarations: [
    ListadoComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    AbonosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AbonosModule { }
