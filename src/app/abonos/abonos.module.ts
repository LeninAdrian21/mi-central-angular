import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { AbonosRoutingModule } from './abonos-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAbonosComponent } from './pages/form-abonos/form-abonos.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
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
    AutocompleteLibModule,
    InfiniteScrollModule
  ]
})
export class AbonosModule { }
