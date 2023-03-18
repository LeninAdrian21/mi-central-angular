import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormComprasComponent } from './pages/form-compras/form-compras.component';
import { ComprasRoutingModule } from './compras-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './pages/listado/listado.component';




@NgModule({
  declarations: [
    ListadoComponent,
    FormComprasComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComprasModule { }
