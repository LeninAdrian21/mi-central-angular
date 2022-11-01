import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { lotesForm } from 'src/functions/form';
import { Add, lotesId, Update } from 'src/functions/functions';
import { LoteService } from '../../service/lote.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  compras$ = this.get.compras$;
  productos$ = this.get.productos$;
  addLotes!: FormGroup;
  id:any;
  btn: string = "Agregar";
  title: string = "Agregar Lote";
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:LoteService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addLotes = this.formBuilder.group(lotesForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Lotes";
      lotesId(this.service,'lotes/'+ this.id, this.addLotes);
    }
  }
  addLote(){
    if (!this.addLotes.valid){
     return alert('Faltan campos por llenar y/o no son validos');
    }
    const {costo_compra, nombre_producto} = this.addLotes.value
    delete this.addLotes.value.costo_compra
    delete this.addLotes.value.nombre_producto
    this.body = Object.assign(this.addLotes.value)
    if(costo_compra){
      const compras = {
        compras:[
          {
            _id:costo_compra
          }
        ]
      }
      this.body = Object.assign(this.body, compras)
    }
    if(nombre_producto){
      const productos ={
        productos:[
          {
            _id:nombre_producto
          }
        ]
      }
      this.body = Object.assign(this.body, productos)
    }
    if(this.btn == "Actualizar"){
      return Update('lotes',this.id,this.body,this.router,this.service,'Lote actualizado con exito','/lotes/listar');
    }
    Add('lotes',this.body,this.service,this.router,'Lote agregado correctamente','/lotes/listar');
  }
}
