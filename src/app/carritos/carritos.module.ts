import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormCarritosComponent } from './pages/form-carritos/form-carritos.component';
import { CarritosRoutingModule } from './carritos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ListadoComponent,
    FormCarritosComponent
  ],
  imports: [
    CommonModule,
    CarritosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CarritosModule { }
