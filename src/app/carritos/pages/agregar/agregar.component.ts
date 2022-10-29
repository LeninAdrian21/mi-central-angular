import { carritosForm } from './../../../../functions/form';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Add, carritoId, Update } from 'src/functions/functions';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { CarritoService } from '../../service/carrito.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  jwt: any;
  token: any;
  title: string = "Agregar Carrito";
  btn: string = "Agregar";
  addCarritos!: FormGroup;
  id:string = "";
  productos$ = this.get.productos$;
  usuarios$ = this.get.usuarios$;
  body:any;
  constructor(private service:CrudService, private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute, private get: CarritoService) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem('jwt');
    this.token = localStorage.getItem('token');
    this.id = this.route.snapshot.params['id'];
    this.addCarritos = this.formBuilder.group(carritosForm);
    if (this.id){
      this.title = "Actualizar Carrito";
      this.btn = "Actualizar";
      carritoId(this.service, 'carritos/'+ this.id, this.addCarritos);
    }
  }
  addCarrito(){
    if (!this.addCarritos.valid){
     return alert('Faltan campos por llenar y/o no son validos');
    }
    const id_productos = this.addCarritos.value.id_productos;
    const id_usuario = this.addCarritos.value.id_usuario;
    delete this.addCarritos.value.id_productos;
    delete this.addCarritos.value.id_usuario;
    this.body = Object.assign(this.addCarritos.value);
    if(id_productos){
      const productos ={
        productos:[
          {
            _id:id_productos
          }
        ]
      }
      this.body = Object.assign(this.body, productos)
    }
    if(id_usuario){
      const usuario = {
        usuario:{
          _id:id_usuario
        }
      }
      this.body = Object.assign(this.body, usuario);
    }
    console.log(this.body);
    if (this.btn =="Actualizar"){
      return Update('carritos',this.id,this.body,this.router,this.service, 'Carrito actualizado con exito','/carritos/listar');
    }
    Add('carritos',this.body,this.service, this.router,'Carrito agregado correctamente','/carritos/listar');
  }
}
