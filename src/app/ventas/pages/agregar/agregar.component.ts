import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ventasForm } from '../../functions/form';
import { Venta } from '../../functions/functions';
import { VentaService } from '../../service/venta.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  // Formaulario
  carritos$ = this.get.carritos$;
  locales$ =  this.get.locales$;
  metodosPago$ = this.get.metodosPago$;
  rutas$ = this.get.rutas$;
  usuarios$ = this.get.usuarios$;
  vendedores$ = this.get.vendedor$
  formVentas!: FormGroup;
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn: string = "Agregar";
  title: string = "Agregar Venta";
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:VentaService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formVentas = this.formBuilder.group(ventasForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Venta";
      Venta.VentaId(this.service,'ventas/'+this.id,this.formVentas);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formVenta(){
    this.submitted = true;
    if(this.formVentas.invalid){
      Venta.Mensaje('Formulario invalido')
      return;
    }
    const {
      id_usuario,
      id_local,
      id_rutas,
      id_vendedores,
      id_carritos,
      id_metodo_pagos
    } = this.formVentas.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Venta.update(this.service,this.id,this.router,this.formVentas, id_usuario,id_local,id_rutas,id_vendedores,id_carritos,id_metodo_pagos);
      return;
    }
    Venta.add(this.service,this.router,this.formVentas,id_usuario,id_local,id_rutas,id_vendedores,id_carritos,id_metodo_pagos);
    // delete this.addVentas.value.nombre_usuario,
    // delete this.addVentas.value.nombre_local,
    // delete this.addVentas.value.lugar_origen_ruta,
    // delete this.addVentas.value.nombre_vendedor,
    // delete this.addVentas.value.cantidad_carrito,
    // delete this.addVentas.value.numero_tarjeta_metodo_pago
    // this.body = Object.assign(this.addVentas.value);
    // if(nombre_usuario){
    //   const usuario ={
    //     usuario:{
    //       _id:nombre_usuario
    //     }
    //   }
    //   this.body = Object.assign(this.body,usuario);
    // }
    // if(nombre_local){
    //   const local={
    //     local:{
    //       _id:nombre_local
    //     }
    //   }
    //   this.body = Object.assign(this.body,local);
    // }
    // if(lugar_origen_ruta){
    //   const rutas ={
    //     rutas:[
    //       {
    //         _id:lugar_origen_ruta
    //       }
    //     ]
    //   }
    //   this.body = Object.assign(this.body,rutas);
    // }
    // if(nombre_vendedor){
    //   const vendedor ={
    //     vendedor:[
    //       {
    //         _id:nombre_vendedor
    //       }
    //     ]
    //   }
    //   this.body = Object.assign(this.body,vendedor);
    // }
    // if(cantidad_carrito){
    //   const carritos={
    //     carritos:[
    //       {
    //         _id:cantidad_carrito
    //       }
    //     ]
    //   }
    //   this.body = Object.assign(this.body,carritos);
    // }
    // if(numero_tarjeta_metodo_pago){
    //   const metodos_de_pagos = {
    //     metodos_de_pagos:[
    //       {
    //         _id:numero_tarjeta_metodo_pago
    //       }
    //     ]
    //   }
    // //   this.body = Object.assign(this.body,metodos_de_pagos);
    // // }
    // if(this.btn =="Actualizar"){
    //   return Update('ventas',this.id,this.body,this.router,this.service,'Venta actualizado con exito','/ventas/listar');
    // }
    // Add('ventas',this.body,this.service,this.router,'Venta agregado correctamente','/ventas/listar');
  }

}
