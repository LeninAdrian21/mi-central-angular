import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormHistorialesComponent } from './pages/form-historiales/form-historiales.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialesRoutingModule } from './historiales-routing.module';
@NgModule({
  declarations: [
    ListadoComponent,
    FormHistorialesComponent
  ],
  imports: [
    CommonModule,
    HistorialesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HistorialesModule { }
