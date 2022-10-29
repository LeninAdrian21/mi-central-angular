import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalesRoutingModule } from './locales-routing.module';



@NgModule({
  declarations: [
    ListadoComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    LocalesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LocalesModule { }
