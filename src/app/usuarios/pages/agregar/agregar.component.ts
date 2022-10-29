import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonoService } from 'src/app/abonos/service/abono.service';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import {  usuariosForm } from 'src/functions/form';
import { Add, Update, usuariosId } from 'src/functions/functions';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  tipo_sangre:any;
  abonos$ = this.get.abonos$;
  camiones$ = this.get.camiones$;
  carritos$ = this.get.carritos$;
  creditos$ = this.get.creditos$;
  gastos$ = this.get.gastos$;
  historiales$ = this.get.historiales$;
  locales$= this.get.locales$;
  metodoPago$ = this.get.metodoPago$;
  ventas$ = this.get.ventas$;
  addUsuarios!: FormGroup;
  id:any;
  btn: string = "Agregar";
  title: string = "Agregar Usuario";
  body:any;

  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:UsuarioService) { }
  ngOnInit(): void {
    this.tipo_sangre = ["Tipo A+","Tipo A-","Tipo B+","Tipo B-","Tipo AB+","Tipo AB-", "Tipo O+","Tipo O-"]
    this.id = this.route.snapshot.params['id'];
    this.addUsuarios = this.formBuilder.group(usuariosForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      usuariosId(this.service,'usuarios/'+this.id, this.addUsuarios);

    }
  }
  addUsuario(){
    this.addUsuarios.value.nss = this.addUsuarios.value.nss.toString();
    this.addUsuarios.value.tel_cel = this.addUsuarios.value.tel_cel.toString();
    this.addUsuarios.value.numero = this.addUsuarios.value.numero.toString();
    this.addUsuarios.value.cp = this.addUsuarios.value.cp.toString();
    if (!this.addUsuarios.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }

    if(this.addUsuarios.value.tel_cel.length !==10){
      return alert('El numero de telefono debe de tener 10 digitos')
    }
    if(this.addUsuarios.value.nss.length !==8) {
      return alert('El numero de seguro social solo puede tener 8 caracteres')
    }
    const {
      monto_gasto,
      nombre_local,
      monto_venta,
      num_serie_camion,
      id_carrito,
      cantidad_abono,
      limite_credito,
      fecha_historial,
      numero_tarjeta_metodo_pago,
      rol_id
    } = this.addUsuarios.value;

    delete this.addUsuarios.value.monto_gasto,
    delete this.addUsuarios.value.nombre_local,
    delete this.addUsuarios.value.monto_venta,
    delete this.addUsuarios.value.num_serie_camion,
    delete this.addUsuarios.value.id_carrito,
    delete this.addUsuarios.value.cantidad_abono,
    delete this.addUsuarios.value.limite_credito,
    delete this.addUsuarios.value.fecha_historial,
    delete this.addUsuarios.value.numero_tarjeta_metodo_pago
    this.body = Object.assign(this.addUsuarios.value);
    if(monto_gasto){
      const gastos = {
        gastos:[
          {
            _id:monto_gasto
          }
        ]
      }
      this.body = Object.assign(this.body, gastos)
    }
    if(nombre_local){
      const local ={
        local:[
          {
            _id:nombre_local
          }
        ]
      }
      this.body = Object.assign(this.body, local)
    }
    if(monto_venta){
      const ventas =[
        {
          _id:monto_venta
        }
      ]
      this.body = Object.assign(this.body, ventas)
    }
    if(num_serie_camion){
      const camiones =[
        {
          _id:num_serie_camion
        }
      ]
      this.body = Object.assign(this.body, camiones)
    }
    if(id_carrito){
      const carritos = {
        carritos:[
          {
            _id:id_carrito
          }
        ]
      }
      this.body = Object.assign(this.body, carritos)
    }
    if(cantidad_abono){
      const abonos = {
        abonos:[
          {
            _id:cantidad_abono
          }
        ]
      }
      this.body = Object.assign(this.body, abonos)
    }
    if(limite_credito){
      const creditos = {
        creditos:[
          {
            _id:limite_credito
          }
        ]
      }
      this.body = Object.assign(this.body, creditos)
    }
    if(fecha_historial){
      const historiales = {
        historials:[
          {
            _id:fecha_historial
          }
        ]
      }
      this.body = Object.assign(this.body, historiales)
    }
    if(numero_tarjeta_metodo_pago){
      const metodos_de_pagos={
        metodos_de_pagos:[
          {
            _id:numero_tarjeta_metodo_pago
          }
        ]
      }
      this.body = Object.assign(this.body, metodos_de_pagos)
    }
    if(rol_id){
      const tipo_rol ={
        tipo_rol:{
          _id: rol_id
        }
      }
      this.body = Object.assign(this.body, tipo_rol);
    }
    if(this.btn =="Actualizar"){
      return Update('usuarios',this.id,this.body,this.router,this.service,'Usuaario actualizado con exito','/usuarios/listar');
    }
    Add('usuarios',this.body,this.service,this.router,'Usuario agregado correctamente','/usuarios/listar');
  }
}
