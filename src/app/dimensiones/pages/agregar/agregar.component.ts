import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { dimensionesForm } from 'src/functions/form';
import { Add, dimensionesId, Update } from 'src/functions/functions';
import { DimensionService } from '../../service/dimension.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  jwt: any;
  toke: any;
  addDimensiones!: FormGroup;
  id:string = "";
  btn:string = "Agregar";
  title:string = "Agregar Dimensiones";
  productos$ = this.get.productos$;
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:DimensionService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addDimensiones = this.formBuilder.group(dimensionesForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Dimensiones";
      dimensionesId(this.service,'dimensiones/'+ this.id,this.addDimensiones);
    }
  }
  addDimension(){
    if (!this.addDimensiones.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {id_productos} = this.addDimensiones.value;
    delete this.addDimensiones.value.id_productos;
    this.body = Object.assign(this.addDimensiones.value);
    if(id_productos){
      const productos = {
        productos:[
          {
            _id:id_productos
          }
        ]
      }
      this.body = Object.assign(this.body, productos);
    }
    console.log(this.body);
    if(this.btn == "Actualizar"){
      return Update('dimensiones',this.id,this.body,this.router,this.service,'Dimension actualizada con exito','/dimensiones/listar');
    }
    Add('dimensiones',this.body,this.service,this.router,'Dimension agregada correctamente','/dimensiones/listar');
  }
}
