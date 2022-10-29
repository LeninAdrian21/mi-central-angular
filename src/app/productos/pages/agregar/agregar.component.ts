import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { productosForm } from 'src/functions/form';
import { Add, productosId, Update } from 'src/functions/functions';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  addProductos!: FormGroup;
  id:any;
  btn: string = "Agregar";
  title: string = "Agregar Producto";
  dimensiones$ = this.get.dimensiones$;
  lotes$ = this.get.lotes$;
  promociones$ = this.get.promociones$;
  proveedores$ = this.get.proveedores$;
  carritos$ = this.get.carritos$;
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get :ProductoService) { }
  ngOnInit(): void {
    console.log(this.dimensiones$);
    this.id = this.route.snapshot.params['id'];
    this.addProductos = this.formBuilder.group(productosForm)
    this.addProductos.patchValue({
      status: false,
    });
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Producto";
      productosId(this.service,'productos/'+this.id, this.addProductos);
    }

  }
  addProducto(){
    if (!this.addProductos.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {id_dimension,id_lote,id_promociones,id_proveedor,id_carritos} = this.addProductos.value;
    delete this.addProductos.value.id_dimension;
    delete this.addProductos.value.id_lote;
    delete this.addProductos.value.id_promociones;
    delete this.addProductos.value.id_proveedor;
    delete this.addProductos.value.id_carritos;
    this.body= Object.assign(this.addProductos.value);
    if(id_dimension){
      const dimension ={
        dimension:{
          _id:id_dimension
        }
      }
      this.body = Object.assign(this.body, dimension);
    }
    if(id_lote){
      const lote ={
        lote:{
          _id:id_lote
        }
      }
      this.body = Object.assign(this.body, lote);
    }
    if(id_promociones){
      const promociones ={
        promociones:[{
          _id:id_promociones
        }]
      }
      this.body = Object.assign(this.body, promociones);
    }
    if(id_proveedor){
      const proveedor ={
        proveedor:{
          _id:id_proveedor
        }
      }
      this.body = Object.assign(this.body, proveedor);
    }
    if(id_carritos){
      const carritos ={
        carritos:[{
          _id:id_carritos
        }]
      }
      this.body = Object.assign(this.body, carritos);
    }
    if(this.btn =="Actualizar"){
      return Update ('productos',this.id,this.body,this.router,this.service, 'Producto actualizado con exito','/productos/listar');

    }
    Add('productos',this.body,this.router,this.service,'Producto agregado correctamente','/productos/listar');
  }
}
