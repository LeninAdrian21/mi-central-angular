import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { gastosForm } from 'src/functions/form';
import { Add, gastosId, Update } from 'src/functions/functions';
import { GastoService } from '../../service/gasto.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  addGastos!: FormGroup;
  id:any;
  btn:string = "Agregar";
  title:string  = "Agregar Gasto";
  usuarios$ = this.get.usuarios$;
  camiones$ = this.get.camiones$;
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get: GastoService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addGastos = this.formBuilder.group(gastosForm)
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Gasto";

      gastosId(this.service,'gastos/'+this.id, this.addGastos);
    }

  }

  addGasto(){
    if (!this.addGastos.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {id_usuario, id_camion} = this.addGastos.value;
    delete this.addGastos.value.id_usuario;
    delete this.addGastos.value.id_camion;
    this.body = Object.assign(this.addGastos.value);
    if(id_usuario){
      const usuario = {
        usuario:{
          _id:id_usuario
        }
      }
      this.body =  Object.assign(this.body,usuario)
    }
    if(id_camion){
      const camion = {
        camion:{
          _id: id_camion
        }
      }
      this.body = Object.assign(this.body,camion);
    }
    if(this.btn =="Actualizar"){
      return Update('gastos',this.id,this.body,this.router,this.service,'Gasto actualizado correctamente','/gastos/listar');
    }
    Add('gastos',this.body,this.service,this.router,'Gastos agregado con exito', '/gastos/listar');
  }
}
