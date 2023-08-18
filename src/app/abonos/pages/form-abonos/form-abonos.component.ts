import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { AbonoService } from '../../service/abono.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Form} from 'src/functions/forms';
import { Funcions, Mensaje } from 'src/functions/functions';
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
      const control = this.formBuilder.control({ value: field.default, disabled: field.disabled }, field.validators);
      this.formAbonos.addControl(field.name, control);
    });
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Funcions.CollectionId(this.service,'abonos/'+ this.id,this.formAbonos,'abonos');
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formAbono(){
    if(this.formAbonos.invalid){
      Mensaje('Faltan datos en el formulario')
      return;
    }
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Funcions.update(this.service,'abonos',this.id,this.router,this.formAbonos.value,'Abonos','/abonos/listar');
      return;
    }
    Funcions.add(this.service,this.router,this.formAbonos.value, 'abonos','Abonos','/abonos/listar','Abono agregado correctamente','Error al agregar Abono',this.date)
  }
}
