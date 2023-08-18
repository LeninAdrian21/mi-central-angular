import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { MedotoPagoService } from '../../service/medoto-pago.service';
import { MetodoPago } from '../../functions/functions';
import { metodosPagoForm } from '../../functions/form';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  // Formaulario
  usuarios$= this.get.usuarios$;
  ventas$ = this.get.ventas$;
  creditos$ = this.get.creditos$;
  compras$ = this.get.compras$;
  formMetodosPago!: FormGroup;
  fecha:any = new Date();
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn: string = "Agregar";
  title: string = "Agregar Metodo de pago";
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get:MedotoPagoService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.formMetodosPago = this.formBuilder.group(metodosPagoForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Metodo de pago";
      MetodoPago.MetodoPagoId(this.service,'metodo-pagos/'+this.id,this.formMetodosPago);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }

  formMetodoPago(){
    this.submitted = true;
    if (this.formMetodosPago.invalid){
      MetodoPago.Mensaje('Formulario invalido')
      return;
    }
    const {id_usuario, id_venta, id_creditos, id_compras} = this.formMetodosPago.value;
    // if(id_usuario){
    //   const usuario ={
    //     usuario:{
    //       _id:id_usuario
    //     }
    //   }
    //   this.body = Object.assign(this.body,usuario)
    // }
    // if(id_venta){
    //   const venta = {
    //     venta:{
    //       _id:id_venta
    //     }
    //   }
    //   this.body = Object.assign(this.body,venta)
    // }
    // if(id_creditos){
    //   const creditos={
    //     creditos:[
    //       {
    //         _id:id_creditos
    //       }
    //     ]
    //   }
    //   this.body = Object.assign(this.body,creditos)
    // }
    // if(id_compras){
    //   const compras ={
    //     compras:[
    //       {
    //         _id:id_compras
    //       }
    //     ]
    //   }
    //   this.body = Object.assign(this.body,compras)
    // }
    // let {numero_tarjeta, cvc}=this.body;
    // numero_tarjeta = numero_tarjeta.toString();
    // cvc = cvc.toString();
    // if(numero_tarjeta.length > 15 && numero_tarjeta.length < 20 && cvc.length == 3 ){
    this.addUpdate = true;
    if(this.btn =="Actualizar"){
      MetodoPago.update(this.service,this.id,this.router,this.formMetodosPago,id_usuario, id_venta, id_creditos, id_compras);
      return
    }
    MetodoPago.add(this.service,this.router,this.formMetodosPago,id_usuario, id_venta, id_creditos, id_compras);
  }
}
