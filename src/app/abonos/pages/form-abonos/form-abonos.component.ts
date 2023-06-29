import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { AbonoService } from '../../service/abono.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Abono } from '../../function/functions';
import { Form} from 'src/functions/forms';
@Component({
  selector: 'app-form-abonos',
  templateUrl: './form-abonos.component.html',
  styleUrls: ['./form-abonos.component.scss']
})
export class FormAbonosComponent implements OnInit{
  formAbonos!: FormGroup;
  title:string = 'Agregar Abono';
  creditos$ = this.get.creditos$;
  usuarios$ = this.get.usuarios$;
  fields:any;
  picker:any;
  id:any;
  btn:string = 'Agregar';
  addUpdate = false;
  cargaOptions: boolean = false;
  date = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private get:AbonoService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.fields = Form('abono', this.date);
    this.formAbonos = this.formBuilder.group({});
    this.fields.forEach((field:any) => {
      const validators = field.required ? [ Validators.required] : [];
      const control = this.formBuilder.control({ value: field.default, disabled: field.disabled }, validators);
      this.formAbonos.addControl(field.name, control);
    });
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Abono.AbonoId(this.service,'abonos/'+ this.id,this.formAbonos);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
    this.service.addCampo = true;
    console.log(this.service.addCampo)
  }
  formAbono(){
    if(this.formAbonos.invalid){
      Abono.Mensaje('Formulario invalido')
      return;
    }
    const {id_credito,id_usuario} = this.formAbonos.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Abono.update(this.service,this.id,this.router,this.formAbonos,id_credito,id_usuario, this.date);
      return;
    }
    Abono.add(this.service,this.router,this.formAbonos,id_credito,id_usuario, this.date);
  }
}
