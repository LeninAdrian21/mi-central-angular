import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { comprasForm } from 'src/functions/form';
import { Add, compraId, Update } from 'src/functions/functions';
import { CompraService } from '../../service/compra.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  addCompras!: FormGroup;
  id:string = "";
  btn: string = "Agregar";
  title: string = "Agregar Compra";
  metodoPago$ = this.get.metodoPago$;
  lotes$ = this.get.lotes$;
  proveedores$ = this.get.proveedores$;
  body:any;
  constructor(private service:CrudService, private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute, private get:CompraService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addCompras = this.formBuilder.group(comprasForm)
    if (this.id){
      this.title = "Actualizar Compra";
      this.btn = "Actualizar";
      compraId(this.service,'compras/'+this.id, this.addCompras);
    }
  }
  addCompra(){
    if (!this.addCompras.valid){
     return alert('Faltan campos por llenar y/o no son validos');
    }
    const {id_metodoPago,id_lote,id_proveedor} = this.addCompras.value;
    delete this.addCompras.value.id_metodoPago
    delete this.addCompras.value.id_lote
    delete this.addCompras.value.id_proveedor
    this.body = Object.assign(this.addCompras.value)
    if(id_metodoPago){
      const metodo_pago={
        metodos_de_pago:{
          _id:id_metodoPago
        }
      }
      this.body = Object.assign(this.body, metodo_pago);
    }
    if(id_lote){
      const lote={
        lote:{
          _id:id_lote
        }
      }
      this.body = Object.assign(this.body, lote);
    }
    if(id_proveedor){
      const proveedor ={
        proveedor:{
          _id:id_proveedor
        }
      }
      this.body = Object.assign(this.body, proveedor)
    }
    console.log(this.body);
    if (this.btn =="Actualizar"){
      return Update('compras',this.id,this.body,this.router, this.service,'Compra actualizada con exito','/compras/listar')
    }
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
    Add('compras',this.body,this.service,this.router,'Compra agregada correctamente','/compras/listar')
  }
}
