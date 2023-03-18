import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../functions/functions';
import { productosForm } from '../../functions/form';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
   // Formaulario
   dimensiones$ = this.get.dimensiones$;
   lotes$ = this.get.lotes$;
   promociones$ = this.get.promociones$;
   proveedores$ = this.get.proveedores$;
   carritos$ = this.get.carritos$;
   formProductos!: FormGroup;
   // el id y el cuerpo de la peticion
   id:any;
   //texto dinamicos
   btn:string = 'Agregar';
   title:string = 'Agregar Producto';
   // Cambios en la interfaz;
   cargaOptions = false;
   submitted = false;
   // boton de Loading en la interfas
   addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get:ProductoService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.formProductos = this.formBuilder.group(productosForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Producto";
      Producto.ProductoId(this.service,'productos/'+this.id,this.formProductos);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)

  }
  formProducto(){
    this.submitted = true;
    if(this.formProductos.invalid){
      Producto.Mensaje('Formulario invalido')
      return;
    }
    const {id_dimension,id_lote,id_promociones,id_proveedor,id_carritos} = this.formProductos.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Producto.update(this.service,this.id,this.router,this.formProductos,id_dimension,id_lote,id_promociones,id_proveedor,id_carritos);
      return;
    }
    Producto.add(this.service,this.router,this.formProductos,id_dimension,id_lote,id_promociones,id_proveedor,id_carritos);
  }
  // addProducto(){
  //   if (!this.addProductos.valid){
  //     return alert('Faltan campos por llenar y/o no son validos');
  //   }
  //   const {id_dimension,id_lote,id_promociones,id_proveedor,id_carritos} = this.addProductos.value;
  //   delete this.addProductos.value.id_dimension;
  //   delete this.addProductos.value.id_lote;
  //   delete this.addProductos.value.id_promociones;
  //   delete this.addProductos.value.id_proveedor;
  //   delete this.addProductos.value.id_carritos;
  //   this.body= Object.assign(this.addProductos.value);
  //   if(id_dimension){
  //     const dimension ={
  //       dimension:{
  //         _id:id_dimension
  //       }
  //     }
  //     this.body = Object.assign(this.body, dimension);
  //   }
  //   if(id_lote){
  //     const lote ={
  //       lote:{
  //         _id:id_lote
  //       }
  //     }
  //     this.body = Object.assign(this.body, lote);
  //   }
  //   if(id_promociones){
  //     const promociones ={
  //       promociones:[{
  //         _id:id_promociones
  //       }]
  //     }
  //     this.body = Object.assign(this.body, promociones);
  //   }
  //   if(id_proveedor){
  //     const proveedor ={
  //       proveedor:{
  //         _id:id_proveedor
  //       }
  //     }
  //     this.body = Object.assign(this.body, proveedor);
  //   }
  //   if(id_carritos){
  //     const carritos ={
  //       carritos:[{
  //         _id:id_carritos
  //       }]
  //     }
  //     this.body = Object.assign(this.body, carritos);
  //   }
  //   if(this.btn =="Actualizar"){
  //     return Update ('productos',this.id,this.body,this.router,this.service, 'Producto actualizado con exito','/productos/listar');

  //   }
  //   Add('productos',this.body,this.router,this.service,'Producto agregado correctamente','/productos/listar');
  // }
}
