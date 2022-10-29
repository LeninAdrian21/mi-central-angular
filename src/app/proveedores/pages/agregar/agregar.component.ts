import { proveedoresForm } from './../../../../functions/form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonoService } from 'src/app/abonos/service/abono.service';
import { Add, proveedoresId, Update } from 'src/functions/functions';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  productos$ = this.get.productos$;
  compras$ = this.get.compras$;
  addProveedores!:FormGroup;
  id: any;
  btn: string = 'Agregar';
  title: string = "Agregar Proveedor";
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute,private get:ProveedorService ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addProveedores = this.formBuilder.group(proveedoresForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Proveedor";
      proveedoresId(this.service,'proveedors/'+ this.id, this.addProveedores);
    }
  }
  addProveedor(){
    if(!this.addProveedores.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {productos_nombre, id_compra} = this.addProveedores.value;
    delete this.addProveedores.value.productos_nombre;
    delete this.addProveedores.value.id_compras;
    this.body = Object.assign(this.addProveedores.value);
    if(productos_nombre){
      const productos ={
        productos:[
          {
            _id:productos_nombre
          }
        ]
      }
      this.body = Object.assign(this.body, productos);
    }
    if(id_compra){
      const compras ={
        compras: [
          {
            _id:id_compra
          }
        ]
      }
      this.body = Object.assign(this.body, compras);
    }
    if(this.btn =="Actualizar"){
      return Update('proveedors',this.id,this.body,this.router,this.service,'Proveedor actualizado con exito','/proveedores/listar');
    }
    Add('proveedors',this.body,this.service,this.router,'Proveedor agregado correctamente','/proveedores/listar');
  }
}
