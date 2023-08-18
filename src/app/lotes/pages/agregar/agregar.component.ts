import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { lotesForm } from '../../functions/form';
import { Lote } from '../../functions/functions';
import { LoteService } from '../../service/lote.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  // Formaulario
  compras$ = this.get.compras$;
  productos$ = this.get.productos$;
  formLotes!: FormGroup;
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn:string = 'Agregar';
  title:string = 'Agregar Lote';
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get:LoteService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.formLotes = this.formBuilder.group(lotesForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Lote";
      Lote.LoteId(this.service,'lotes/'+this.id,this.formLotes);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formLote(){
    this.submitted = true;
    if(this.formLotes.invalid){
      Lote.Mensaje('Formulario invalido')
      return;
    }
    const {id_compras,id_productos} = this.formLotes.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Lote.update(this.service,this.id,this.router,this.formLotes,id_compras,id_productos);
      return;
    }
    Lote.add(this.service,this.router,this.formLotes,id_compras,id_productos);
  }
  // addLote(){
  //   if (!this.addLotes.valid){
  //    return alert('Faltan campos por llenar y/o no son validos');
  //   }
  //   const {costo_compra, nombre_producto} = this.addLotes.value
  //   delete this.addLotes.value.costo_compra
  //   delete this.addLotes.value.nombre_producto
  //   this.body = Object.assign(this.addLotes.value)
  //   if(costo_compra){
  //     const compras = {
  //       compras:[
  //         {
  //           _id:costo_compra
  //         }
  //       ]
  //     }
  //     this.body = Object.assign(this.body, compras)
  //   }
  //   if(nombre_producto){
  //     const productos ={
  //       productos:[
  //         {
  //           _id:nombre_producto
  //         }
  //       ]
  //     }
  //     this.body = Object.assign(this.body, productos)
  //   }
  //   if(this.btn == "Actualizar"){
  //     return Update('lotes',this.id,this.body,this.router,this.service,'Lote actualizado con exito','/lotes/listar');
  //   }
  //   Add('lotes',this.body,this.service,this.router,'Lote agregado correctamente','/lotes/listar');
  // }
}
