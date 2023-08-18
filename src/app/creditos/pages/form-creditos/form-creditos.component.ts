import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { creditosForm } from '../../functions/form';
import { Credito } from '../../functions/functions';
import { CreditoService } from '../../service/credito.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './form-creditos.component.html',
  styleUrls: ['./form-creditos.component.scss']
})
export class FormCreditosComponent implements OnInit {

  // Formaulario
  usuario$ = this.get.usuarios$;
  metodo_pago$ = this.get.metodoPago$;
  abonos$ = this.get.abonos$;
  formCreditos!: FormGroup;
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

  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get: CreditoService) { }
  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.formCreditos = this.formBuilder.group(creditosForm);

    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Credito.CreditoId(this.service,'creditos/'+this.id,this.formCreditos);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formCredito(){
    this.submitted = true;
    if(this.formCreditos.invalid){
      Credito.Mensaje('Formulario invalido')
      return;
    }
    const {id_usuario,id_metodoPago,id_abonos} = this.formCreditos.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Credito.update(this.service,this.id,this.router,this.formCreditos,id_usuario,id_metodoPago,id_abonos);
      return;
    }
    Credito.add(this.service,this.router,this.formCreditos,id_usuario,id_metodoPago,id_abonos);
  }
}
