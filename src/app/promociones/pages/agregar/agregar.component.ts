import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonoService } from 'src/app/abonos/service/abono.service';
import { promocionesForm } from 'src/functions/form';
import { Add, promocionesId, Update } from 'src/functions/functions';
import { PromocionService } from '../../service/promocion.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  addPromociones!:FormGroup;
  id:any;
  btn:string="Agregar";
  title:string = "Agregr Promocion";
  body:any;
  productos$ = this.get.productos$;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:PromocionService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addPromociones = this.formBuilder.group(promocionesForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Promocion";
      promocionesId(this.service,'promociones/'+ this.id,this.addPromociones);
    }
  }
  addPromocion(){
    if (!this.addPromociones.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {producto_nombre} = this.addPromociones.value;
    delete this.addPromociones.value.producto_nombre
    this.body = Object.assign(this.addPromociones.value);
    if(producto_nombre){
      const productos = {
        productos:[
          {
            _id:producto_nombre
          }
        ]
      }
      this.body = Object.assign(this.body, productos)
    }
    if(this.btn =="Actualizar"){
      return Update('promociones',this.id,this.body,this.router,this.service,'Promocion actualizado con exito','/promociones/listar');
    }
    Add('promociones',this.body,this.service,this.router,'Promocion agregado correctamente','/abonos/listar');
  }
}
