import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { comprasForm } from '../../functions/form';
import { Compra } from '../../functions/functions';
import { CompraService } from '../../service/compra.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './form-compras.component.html',
  styleUrls: ['./form-compras.component.scss']
})
export class FormComprasComponent implements OnInit {
  // Formaulario
  metodoPago$ = this.get.metodoPago$;
  proveedores$ = this.get.proveedores$;
  lotes$ = this.get.lotes$;
  usuarios$ = this.get.usuarios$;
  formCompras!:FormGroup;
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn:string = 'Agregar';
  title:string = 'Agregar compra';
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(
    private formBuilder:FormBuilder,
    private get:CompraService ,
    private service:CrudService,
    private route:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formCompras = this.formBuilder.group(comprasForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Compra";
      Compra.CompraId(this.service,'compras/' + this.id,this.formCompras );
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000);
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formCompra(){
    this.submitted = true;
    if(this.formCompras.invalid){
      Compra.Mensaje('Formulario invalido');
      return;
    }
    const {id_metodoPago,id_lote,id_proveedor,id_usuarios} = this.formCompras.value;
    this.addUpdate =true;
    if(this.btn == 'Actualizar'){
      Compra.update(this.service,this.id,this.router,this.formCompras,id_metodoPago,id_lote,id_proveedor,id_usuarios);
      return;
    }
    Compra.add(this.service,this.router,this.formCompras,id_metodoPago,id_lote,id_proveedor,id_usuarios);
    // if (!this.addCompras.valid){
    //  return alert('Faltan campos por llenar y/o no son validos');
    // }
    // const {id_metodoPago,id_lote,id_proveedor} = this.addCompras.value;
    // delete this.addCompras.value.id_metodoPago
    // delete this.addCompras.value.id_lote
    // delete this.addCompras.value.id_proveedor
    // this.body = Object.assign(this.addCompras.value)
    // if(id_metodoPago){
    //   const metodo_pago={
    //     metodos_de_pago:{
    //       _id:id_metodoPago
    //     }
    //   }
    //   this.body = Object.assign(this.body, metodo_pago);
    // }
    // if(id_lote){
    //   const lote={
    //     lote:{
    //       _id:id_lote
    //     }
    //   }
    //   this.body = Object.assign(this.body, lote);
    // }
    // if(id_proveedor){
    //   const proveedor ={
    //     proveedor:{
    //       _id:id_proveedor
    //     }
    //   }
    //   this.body = Object.assign(this.body, proveedor)
    // }
    // console.log(this.body);
    // if (this.btn =="Actualizar"){
    //   localStorage.setItem('carga','true');
    //   this.carga = localStorage.getItem('carga');
    //   return Update('compras',this.id,this.body,this.router, this.service,'Compra actualizada con exito','/compras/listar')
    // }
    // this.service.add('compras',this.addCompras.value,this.jwt,this.token).subscribe(
    //   (data) => {
    //     console.log(data);
    //     alert("Compra agregada correctamente");
    //     this.router.navigate(['/compras/listar']);
    //     this.service.addCampo = true;
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert('Error al agregar');
    //   }
    // );
    // Add('compras',this.body,this.service,this.router,'Compra agregada correctamente','/compras/listar')
  }
}
