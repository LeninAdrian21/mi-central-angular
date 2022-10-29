import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ventasForm } from 'src/functions/form';
import { Add, Update, VentasId } from 'src/functions/functions';
import { VentaService } from '../../service/venta.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  carritos$ = this.get.carritos$;
  locales$ =  this.get.locales$;
  metodoPago$ = this.get.metodoPago$;
  rutas$ = this.get.rutas$;
  usuarios$ = this.get.usuarios$;
  vendedores$ = this.get.vendedor$
  addVentas!: FormGroup;
  id:any;
  btn: string = "Agregar";
  title: string = "Agregar Venta";
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:VentaService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addVentas = this.formBuilder.group(ventasForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Venta";
      VentasId(this.service,'ventas/'+ this.id,this.addVentas);
    }
  }
  addVenta(){
    if (!this.addVentas.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {
      nombre_usuario,
      nombre_local,
      lugar_origen_ruta,
      nombre_vendedor,
      cantidad_carrito,
      numero_tarjeta_metodo_pago
    } = this.addVentas.value;
    delete this.addVentas.value.nombre_usuario,
    delete this.addVentas.value.nombre_local,
    delete this.addVentas.value.lugar_origen_ruta,
    delete this.addVentas.value.nombre_vendedor,
    delete this.addVentas.value.cantidad_carrito,
    delete this.addVentas.value.numero_tarjeta_metodo_pago
    this.body = Object.assign(this.addVentas.value);
    if(nombre_usuario){
      const usuario ={
        usuario:{
          _id:nombre_usuario
        }
      }
      this.body = Object.assign(this.body,usuario);
    }
    if(nombre_local){
      const local={
        local:{
          _id:nombre_local
        }
      }
      this.body = Object.assign(this.body,local);
    }
    if(lugar_origen_ruta){
      const rutas ={
        rutas:[
          {
            _id:lugar_origen_ruta
          }
        ]
      }
      this.body = Object.assign(this.body,rutas);
    }
    if(nombre_vendedor){
      const vendedor ={
        vendedor:[
          {
            _id:nombre_vendedor
          }
        ]
      }
      this.body = Object.assign(this.body,vendedor);
    }
    if(cantidad_carrito){
      const carritos={
        carritos:[
          {
            _id:cantidad_carrito
          }
        ]
      }
      this.body = Object.assign(this.body,carritos);
    }
    if(numero_tarjeta_metodo_pago){
      const metodos_de_pagos = {
        metodos_de_pagos:[
          {
            _id:numero_tarjeta_metodo_pago
          }
        ]
      }
      this.body = Object.assign(this.body,metodos_de_pagos);
    }
    if(this.btn =="Actualizar"){
      return Update('ventas',this.id,this.body,this.router,this.service,'Venta actualizado con exito','/ventas/listar');
    }
    Add('ventas',this.body,this.service,this.router,'Venta agregado correctamente','/ventas/listar');
  }

}
