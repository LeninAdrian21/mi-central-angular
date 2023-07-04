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
    /* `this.id =  this.route.snapshot.params['id'];` is assigning the value of the 'id' parameter from
    the current route snapshot to the variable 'id'. This is typically used to retrieve the value of
    a route parameter. */
    this.id =  this.route.snapshot.params['id'];
    this.fields = Form('abono', this.date);
    this.formAbonos = this.formBuilder.group({});
    /* The code is iterating over each field in the `fields` array and creating a form control for each
    field in the `formAbonos` form group. */
    this.fields.forEach((field:any) => {
      const validators = field.required ? [ Validators.required] : [];
      const control = this.formBuilder.control({ value: field.default, disabled: field.disabled }, validators);
      this.formAbonos.addControl(field.name, control);
    });
    /* This code block is checking if the `id` variable has a value. If it does, it means that the
    component is being used to update an existing record. */
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Funcions.CollectionId(this.service,'abonos/'+ this.id,this.formAbonos,'abonos');
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    /* The `setTimeout` function is a JavaScript function that allows you to delay the execution of a
    piece of code for a specified amount of time. In this case, it is being used to delay the
    assignment of `true` to the `cargaOptions` property of the component for 10 seconds (10000
    milliseconds). */
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  /**
   * The function "formAbono()" is used to handle form submission for adding or updating "abonos"
   * (payments) in a TypeScript application.
   * @returns either nothing (undefined) or it is returning early if the formAbonos is invalid.
   */
  formAbono(){
    if(this.formAbonos.invalid){
      Mensaje('Faltan datos en el formulario')
      return;
    }
    this.addUpdate = true;
   /* The code block `if(this.btn == 'Actualizar')` is checking if the value of the `btn` variable is
   equal to the string `'Actualizar'`. If it is, it means that the component is being used to update
   an existing record. */
    if(this.btn == 'Actualizar'){
      Funcions.update(this.service,'abonos',this.id,this.router,this.formAbonos.value,'Abonos','/abonos/listar');
      return;
    }
   /* The code `Funcions.add(this.service,this.router,this.formAbonos,
   'abonos','Abonos','/abonos/listar','Abono agregado correctamente','Error al agregar
   Abono',this.date)` is calling a function named `add` from the `Funcions` module. */
    Funcions.add(this.service,this.router,this.formAbonos.value, 'abonos','Abonos','/abonos/listar','Abono agregado correctamente','Error al agregar Abono',this.date)
  }
}
