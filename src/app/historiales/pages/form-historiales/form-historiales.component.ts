import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Historial } from '../../functions/functions';
import { historialesForm } from '../../functions/form';
import { HistorialService } from '../../service/historial.service';
@Component({
  selector: 'app-agregar',
  templateUrl: './form-historiales.component.html',
  styleUrls: ['./form-historiales.component.scss']
})
export class FormHistorialesComponent implements OnInit {
   // Formaulario
   usuarios$ = this.get.usuarios$;
   camiones$ = this.get.camiones$;
   formHistoriales!: FormGroup;
   // el id y el cuerpo de la peticion
   id:any;
   //texto dinamicos
   btn:string = 'Agregar';
   title:string = 'Agregar Historial';
   // Cambios en la interfaz;
   cargaOptions = false;
   submitted = false;
   // boton de Loading en la interfas
   addUpdate = false;
  constructor(
    private service:CrudService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private get:HistorialService) { }
  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.formHistoriales = this.formBuilder.group(historialesForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Historial";
      Historial.HistorialId(this.service,'historials/'+this.id,this.formHistoriales);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formHistorial(){
    this.submitted = true;
    if(this.formHistoriales.invalid){
      Historial.Mensaje('Formulario invalido')
      return;
    }
    const {id_usuario,id_camiones} = this.formHistoriales.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Historial.update(this.service,this.id,this.router,this.formHistoriales,id_usuario,id_camiones);
      return;
    }
    Historial.add(this.service,this.router,this.formHistoriales,id_usuario,id_camiones);
  }
  // addHistorial(){
  //   if (!this.addHistoriales.valid){
  //    return alert('Faltan campos por llenar y/o no son validos');
  //   }
  //   console.log(this.addHistoriales.value);
  //   const hora_inicio = this.addHistoriales.value.hora_inicio.split(':');
  //   const hora_fin = this.addHistoriales.value.hora_fin.split(':');
  //   if (hora_inicio.length == 2  ){
  //     this.addHistoriales.value.hora_inicio = hora_inicio[0]+':'+hora_inicio[1] + ':00';

  //   }
  //   if(hora_fin.length == 2){
  //     this.addHistoriales.value.hora_fin = hora_fin[0]+':'+hora_fin[1] + ':00';
  //   }
  //   const {id_usuario, id_camiones} = this.addHistoriales.value;
  //   delete this.addHistoriales.value.id_usuario;
  //   delete this.addHistoriales.value.id_camiones;
  //   this.body= Object.assign(this.addHistoriales.value);
  //   if(id_usuario){
  //     const usuario={
  //       usuario:{
  //         _id:id_usuario
  //       }
  //     }
  //     this.body = Object.assign(this.body, usuario);
  //   }
  //   if(id_camiones){
  //     const camiones = {
  //       camions:[
  //         {
  //           _id:id_camiones
  //         }
  //       ]
  //     }
  //     this.body = Object.assign(this.body, camiones);
  //   }
  //   if(this.btn =="Actualizar"){
  //     return Update('historials',this.id,this.body, this.router,this.service,'Historial actualizado con exito','/historiales/listar');
  //   }
  //   Add('historials',this.body,this.service,this.router,'Historial agregado con exito','/historiales/listar');
  // }
}
