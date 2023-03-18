
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../service/carrito.service';
import { Carrito } from '../../functions/functions';
import { carritosForm } from '../../functions/form';

@Component({
  selector: 'app-agregar',
  templateUrl: './form-carritos.component.html',
  styleUrls: ['./form-carritos.component.scss']
})
export class FormCarritosComponent implements OnInit {
  //Formulario
  usuarios$ = this.get.usuarios$;
  productos$ = this.get.productos$;
  ventas$ = this.get.ventas$;
  formCarritos!:FormGroup;
  //Peticion
  id:any;
  body:any;
  //textos dinamicos
  btn:string = 'Agregar';
  title:string ='Agregar Carrito';
  // Cambios en la interfaz
  cargaOptions = false;
  submitted = false;
  addUpdate = false;
  constructor(private service:CrudService, private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute, private get: CarritoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formCarritos = this.formBuilder.group(carritosForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Carrito.CarritoId(this.service,'carritos/'+this.id,this.formCarritos);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formCarrito(){
    if (this.formCarritos.invalid){
      return Carrito.Mensaje('Formulario invalido','error')
    }
    const {id_productos,id_usuario,id_venta} = this.formCarritos.value;
    this.body = Carrito.Relations(this.formCarritos,id_productos,id_usuario,id_venta);
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Carrito.update(this.service,this.id,this.router,this.formCarritos,id_productos,id_usuario,id_venta);
      return;
    }
    Carrito.add(this.service,this.router,this.formCarritos,id_productos,id_usuario,id_venta);
  }
}
