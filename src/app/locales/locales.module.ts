import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import {  FormLocalesComponent } from './pages/form-locales/form-locales.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalesRoutingModule } from './locales-routing.module';



@NgModule({
  declarations: [
    ListadoComponent,
    FormLocalesComponent
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
