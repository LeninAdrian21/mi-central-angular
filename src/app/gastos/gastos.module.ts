import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormGastosComponent } from './pages/form-gastos/form-gastos.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GastosRoutingModule } from './gastos-routing.module';



@NgModule({
  declarations: [
    ListadoComponent,
    FormGastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GastosModule { }
