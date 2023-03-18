import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { VendedorService } from '../../service/vendedor.service';
import { Vendedor } from '../../functions/functions';
import { vendedoresForm } from '../../functions/form';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  // Formaulario
  ventas$ = this.get.ventas$;
  formVendedores!:FormGroup;
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn: string = "Agregar";
  title: string = "Agregar Vendedores";
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get:VendedorService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id =  this.route.snapshot.params['id'];
    this.formVendedores = this.formBuilder.group(vendedoresForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Vendedor.VendedoresId(this.service,'vendedores/'+this.id,this.formVendedores);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formVendedor(){
    this.submitted = true;
    if (this.formVendedores.invalid){
      Vendedor.Mensaje('Formulario invalido')
      return;
    }
    const {id_ventas} = this.formVendedores.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Vendedor.update(this.service,this.id,this.router,this.formVendedores,id_ventas);
      return;
    }
    Vendedor.add(this.service,this.router,this.formVendedores,id_ventas);
  }

}
