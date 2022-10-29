import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { metodoPagoForm } from 'src/functions/form';
import { Add, metodoPagoId, Update } from 'src/functions/functions';
import { MedotoPagoService } from '../../service/medoto-pago.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  addMetodosPago!: FormGroup;
  usuarios$= this.get.usuarios$;
  ventas$ = this.get.ventas$;
  creditos$ = this.get.creditos$;
  compras$ = this.get.compras$;
  id:any;
  btn: string = "Agregar";
  title: string = "Agregar Metodo de pago";
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:MedotoPagoService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMetodosPago = this.formBuilder.group(metodoPagoForm)
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Metodo de pago";
      metodoPagoId(this.service,'metodos-de-pagos/'+this.id,this.addMetodosPago);
    }
  }

  addMetodoPago(){

    if (!this.addMetodosPago.valid){
     return alert('Faltan campos por llenar y/o no son validos');
    }
    const {id_usuario, id_venta, id_creditos, id_compras} = this.addMetodosPago.value;
    delete this.addMetodosPago.value.id_usuario;
    delete this.addMetodosPago.value.id_venta;
    delete this.addMetodosPago.value.id_creditos;
    delete this.addMetodosPago.value.id_compras;
    this.body = Object.assign(this.addMetodosPago.value);
    if(id_usuario){
      const usuario ={
        usuario:{
          _id:id_usuario
        }
      }
      this.body = Object.assign(this.body,usuario)
    }
    if(id_venta){
      const venta = {
        venta:{
          _id:id_venta
        }
      }
      this.body = Object.assign(this.body,venta)
    }
    if(id_creditos){
      const creditos={
        creditos:[
          {
            _id:id_creditos
          }
        ]
      }
      this.body = Object.assign(this.body,creditos)
    }
    if(id_compras){
      const compras ={
        compras:[
          {
            _id:id_compras
          }
        ]
      }
      this.body = Object.assign(this.body,compras)
    }
    let {numero_tarjeta, cvc}=this.body;
    numero_tarjeta = numero_tarjeta.toString();
    cvc = cvc.toString();
    if(numero_tarjeta.length > 15 && numero_tarjeta.length < 20 && cvc.length == 3 ){
      if(this.btn =="Actualizar"){
        return Update('metodos-de-pagos',this.id,this.body,this.router,this.service,'Metodo de pago actualizado correctamente','/metodo-pago/listar');
      }
      Add('metodos-de-pagos',this.body,this.service,this.router,'Metodo de pago agregado correctamente','/metodo-pago/listar');
    }else{
      alert('El numero de tarjeta debe de tener de 16 a 19 caracteres, el cvc debe son incorrectos');
    }
  }
}
