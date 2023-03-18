import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service';
import { proveedoresForm } from '../../functions/form';
import { Proveedor } from '../../functions/functions';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
   // Formaulario
  productos$ = this.get.productos$;
  compras$ = this.get.compras$;
  formProveedores!:FormGroup;
  // el id y el cuerpo de la peticion
  id: any;
  //texto dinamicos
  btn: string = 'Agregar';
  title: string = "Agregar Proveedor";
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor( private formBuilder: FormBuilder,
    private get:ProveedorService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router ) { }
  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.formProveedores = this.formBuilder.group(proveedoresForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar proveedor";
      Proveedor.ProveedorId(this.service,'proveedors/'+this.id,this.formProveedores);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formProveedor(){
    this.submitted = true;
    if(this.formProveedores.invalid){
      Proveedor.Mensaje('Formulario invalido')
      return;
    }
    const {id_productos, id_compras} = this.formProveedores.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Proveedor.update(this.service,this.id,this.router,this.formProveedores,id_productos, id_compras);
      return;
    }
    Proveedor.add(this.service,this.router,this.formProveedores,id_productos, id_compras);
  }
}
