import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DimensionesRoutingModule } from './dimensiones-routing.module';
import { FormDimensionesComponent } from './pages/form-dimensiones/form-dimensiones.component';




@NgModule({
  declarations: [
    ListadoComponent,
    FormDimensionesComponent
  ],
  imports: [
    CommonModule,
    DimensionesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DimensionesModule { }
