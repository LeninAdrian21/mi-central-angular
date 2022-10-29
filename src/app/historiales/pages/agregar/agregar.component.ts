import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { historialesForm } from 'src/functions/form';
import { Add, historialesId, Update } from 'src/functions/functions';
import { HistorialService } from '../../service/historial.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  addHistoriales!: FormGroup;
  id = this.route.snapshot.params['id'];
  btn: string = "Agregar";
  title: string = "Agregar Historial";
  hora:Time | undefined;
  usuarios$ = this.get.usuarios$;
  camiones$ = this.get.camiones$;
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:HistorialService) { }
  ngOnInit(): void {
    this.addHistoriales = this.formBuilder.group(historialesForm);
    this.addHistoriales.patchValue({
      status: false
    });

    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Historial";
      historialesId(this.service,'historials/'+this.id,this.addHistoriales);
    }
  }
  addHistorial(){
    if (!this.addHistoriales.valid){
     return alert('Faltan campos por llenar y/o no son validos');
    }
    console.log(this.addHistoriales.value);
    const hora_inicio = this.addHistoriales.value.hora_inicio.split(':');
    const hora_fin = this.addHistoriales.value.hora_fin.split(':');
    if (hora_inicio.length == 2  ){
      this.addHistoriales.value.hora_inicio = hora_inicio[0]+':'+hora_inicio[1] + ':00';

    }
    if(hora_fin.length == 2){
      this.addHistoriales.value.hora_fin = hora_fin[0]+':'+hora_fin[1] + ':00';
    }
    const {id_usuario, id_camiones} = this.addHistoriales.value;
    delete this.addHistoriales.value.id_usuario;
    delete this.addHistoriales.value.id_camiones;
    this.body= Object.assign(this.addHistoriales.value);
    if(id_usuario){
      const usuario={
        usuario:{
          _id:id_usuario
        }
      }
      this.body = Object.assign(this.body, usuario);
    }
    if(id_camiones){
      const camiones = {
        camions:[
          {
            _id:id_camiones
          }
        ]
      }
      this.body = Object.assign(this.body, camiones);
    }
    if(this.btn =="Actualizar"){
      return Update('historials',this.id,this.body, this.router,this.service,'Historial actualizado con exito','/historiales/listar');
    }
    Add('historials',this.body,this.service,this.router,'Historial agregado con exito','/historiales/listar');
  }
}
