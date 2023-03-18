import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GastoService } from '../../service/gasto.service';
import { Gasto } from '../../functions/functions';
import { gastosForm } from '../../functions/form';
@Component({
  selector: 'app-agregar',
  templateUrl: './form-gastos.component.html',
  styleUrls: ['./form-gastos.component.scss']
})
export class FormGastosComponent implements OnInit {
   // Formaulario
   usuarios$ = this.get.usuarios$;
   camiones$ = this.get.camiones$;
   formGastos!: FormGroup;
   // el id y el cuerpo de la peticion
   id:any;
   //texto dinamicos
   btn:string = 'Agregar';
   title:string = 'Agregar Abono';
   // Cambios en la interfaz;
   cargaOptions = false;
   submitted = false;
   // boton de Loading en la interfas
   addUpdate = false;
  constructor(
    private formBuilder:FormBuilder,
    private get: GastoService,
    private service:CrudService,
    private route:ActivatedRoute,
    private router:Router,
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formGastos = this.formBuilder.group(gastosForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Gasto.GastoId(this.service,'gastos/'+this.id,this.formGastos);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formGasto(){
    this.submitted = true;
    if(this.formGastos.invalid){
      Gasto.Mensaje('Formulario invalido')
      return;
    }
    const {id_camiones,id_usuario} = this.formGastos.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Gasto.update(this.service,this.id,this.router,this.formGastos,id_camiones,id_usuario);
      return;
    }
    Gasto.add(this.service,this.router,this.formGastos,id_camiones,id_usuario);
  }
}
