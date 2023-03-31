import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { AbonoService } from '../../service/abono.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { abonosForm } from '../../function/form';
import { Abono } from '../../function/functions';

@Component({
  selector: 'app-form-abonos',
  templateUrl: './form-abonos.component.html',
  styleUrls: ['./form-abonos.component.scss']
})
export class FormAbonosComponent implements OnInit {
  prueba:string = '';
  // Formaulario
  usuarios$ = this.get.usuarios$;
  creditos$ = this.get.creditos$;
  formAbonos!: FormGroup;
  fecha:any = new Date();
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn:string = 'Agregar';
  title:string = 'Agregar Abono';
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get:AbonoService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.formAbonos = this.formBuilder.group(abonosForm);
    this.formAbonos.patchValue({
      fecha_abono: this.fecha,
    });
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Abono.AbonoId(this.service,'abonos/'+this.id,this.formAbonos);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formAbono(){
    this.submitted = true;
    if(this.formAbonos.invalid){
      Abono.Mensaje('Formulario invalido')
      return;
    }
    const {id_credito,id_usuario} = this.formAbonos.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Abono.update(this.service,this.id,this.router,this.formAbonos,id_credito,id_usuario,this.fecha);
      return;
    }
    Abono.add(this.service,this.router,this.formAbonos,id_credito,id_usuario,this.fecha);
  }
  Prueba(){
    console.log(this.prueba);
  }
}
