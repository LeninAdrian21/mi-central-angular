import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditosRoutingModule } from './creditos-routing.module';
import { FormCreditosComponent } from './pages/form-creditos/form-creditos.component';



@NgModule({
  declarations: [
    ListadoComponent,
    FormCreditosComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreditosModule { }
