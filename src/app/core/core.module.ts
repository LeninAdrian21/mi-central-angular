import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariablesService } from './services/variables.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[VariablesService ]
})
export class CoreModule { }
