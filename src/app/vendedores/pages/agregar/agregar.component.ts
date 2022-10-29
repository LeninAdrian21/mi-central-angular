import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { vendedoresForm } from 'src/functions/form';
import { Add, Update, VendedoresId } from 'src/functions/functions';
import { VendedorService } from '../../service/vendedor.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  ventas$ = this.get.ventas$;
  addVendedores!:FormGroup;
  id:any;
  btn: string = "Agregar";
  title: string = "Agregar Vendedores";
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:VendedorService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addVendedores = this.formBuilder.group(vendedoresForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Vendedor";
      VendedoresId(this.service,'vendedor-s/'+this.id, this.addVendedores);
    }
  }
  addVendedor(){
    if (!this.addVendedores.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {monto_venta} = this.addVendedores.value;
    delete this.addVendedores.value.monto_venta;
    this.body = Object.assign(this.addVendedores.value);
    if(monto_venta){
      const ventas = {
        ventas:[
          {
            _id:monto_venta
          }
        ]
      }
      this.body = Object.assign(this.body, ventas);
    }
    if(this.btn =="Actualizar"){
      return Update('vendedor-s',this.id,this.body,this.router,this.service,'Vendedor actualizado con exito','/vendedores/listar');
    }
    Add('vendedor-s',this.body,this.service,this.router,'Vendedor agregado correctamente','/vendedores/listar');
  }

}
