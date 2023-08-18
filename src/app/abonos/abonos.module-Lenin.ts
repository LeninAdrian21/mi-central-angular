import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ListadoComponent } from './pages/listado1/listado.component';
import { AbonosRoutingModule } from './abonos-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAbonosComponent } from './pages/form-abonos/form-abonos.component';
// import { ListadoComponent } from './pages/listado4/listado.component';
import { ListadoComponent } from './pages/listado/listado.component';
@NgModule({
  declarations: [
    ListadoComponent,
    FormAbonosComponent,
    ListadoComponent,
    // Listado2Component,
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
