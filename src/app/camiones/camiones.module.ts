import { CamionesRoutingModule } from './camiones-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCamionesComponent } from './pages/form-camiones/form-camiones.component';

@NgModule({
  declarations: [
    ListadoComponent,
    FormCamionesComponent,
  ],
  imports: [
    CommonModule,
    CamionesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CamionesModule { }
