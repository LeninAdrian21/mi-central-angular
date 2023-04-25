import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { AbonosRoutingModule } from './abonos-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAbonosComponent } from './pages/form-abonos/form-abonos.component';
@NgModule({
  declarations: [
    ListadoComponent,
    FormAbonosComponent,
  ],
  imports: [
    CommonModule,
    AbonosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AbonosModule { }
