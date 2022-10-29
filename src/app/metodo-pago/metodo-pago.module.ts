import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetodoPagoRoutingModule } from './metodo-pago-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';



@NgModule({
  declarations: [
    ListadoComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    MetodoPagoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MetodoPagoModule { }
