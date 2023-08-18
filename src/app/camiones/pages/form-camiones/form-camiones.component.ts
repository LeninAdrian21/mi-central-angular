import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
// import Swal from 'sweetalert2';
// import { addPlaca, camionesForm } from '../../functions/form';
// import { Camion } from '../../functions/functions';
import { CamionService } from '../../service/camion.service';
import { Form } from 'src/functions/forms';
import { camionesForm } from '../../functions/form';
import { Funcions } from 'src/functions/functions';
@Component({
  selector: 'app-form-camiones',
  templateUrl: './form-camiones.component.html',
  styleUrls: ['./form-camiones.component.scss']
})
export class FormCamionesComponent implements OnInit {
  formCamiones!:FormGroup;
  title = 'Agregar Camiones';
  historiales$ = this.get.historiales$;
  gastos$ = this.get.gastos$;
  rutas$ = this.get.rutas$;
  usuario$ = this.get.usuario$;
  fields:any;
  picker:any;
  id:any;
  btn = 'Agregar';
  addUpdate=false;
  cargaOptions = false;
  // //errors de form addplacas
  // errorsPlacaAddPlacas:any;
  // errorsEstadoAddPlacas:any;
  // errorsPlacaPlacas:any;
  // errorsEstadoPlacas:any;
  // //algun cambio en la interfaz
  // submitted = false;
  // //textos dinamicos
  // mensaje = '';
  // // Variables del form
  // // variables de placas Form
  // data:any ={
  //   placas:[]
  // }
  // activa:any = [];
  constructor(
      private formBuilder:FormBuilder,
      private get:CamionService,
      private service:CrudService,
      private route:ActivatedRoute,
      private router:Router,
    ) { }
  get placas() {
    return this.formCamiones.get('placas') as FormArray;
  }
  get addplacas(){
    return this.formCamiones.get('addplacas') as FormArray;
  }
  get gastos(){
    return this.formCamiones.get('gastos') as FormArray;
  }
  get rutas(){
    return this.formCamiones.get('rutas') as FormArray;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fields = Form('camion');
    this.formCamiones  = this.formBuilder.group({
      gastos: this.formBuilder.array([]),
      rutas: this.formBuilder.array([]),
      placas: this.formBuilder.array([]),
      addplacas: this.formBuilder.array([]),
    });
    this.fields.forEach((field:any) => {
      const validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }
      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }
      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }
      const control = this.formBuilder.control({ value: field.default, disabled: field.disabled }, validators);
      this.formCamiones.addControl(field.name, control);
    });
    // this.formCamiones = this.formBuilder.group(camionesForm(this.formBuilder));
    if(this.id){
      this.btn = 'Actualizar';
      this.title = 'Actualizar Camion';
      Funcions.CollectionId(this.service,'camiones/' + this.id, this.formCamiones, 'camiones',this.formBuilder,Validators, this.placas,this.gastos,this.rutas);
      console.log(this.formCamiones.value);
      // Camion.CamionId(this.service,'camiones/'+ this.id, this.formCamiones, this.formBuilder,Validators, this.placas,localStorage.getItem('token')!);
      // setTimeout(() => {
      //   this.cargaOptions = true;
      // }, 10000);
      // this.btn = "Actualizar";
      // this.title = "Actualizar Camion";
    }
    // setTimeout(() => {
    //   this.cargaOptions = true;
    // }, 10000);

  }

  // function pricipal para agregar o editar colleccion Camion
  formCamion(){
    console.log(this.formCamiones)
    // this.activa = [];
    // this.data.placas=[];
    // this.submitted = true;
    // const {errorsPlacaAddPlacas, errorsEstadoAddPlacas} = Camion.ErrorsCamionesAddPlacas(this.addplacas.controls);
    // const {errorsPlacaPlacas, errorsEstadoPlacas} = Camion.ErrorsCamionesPlacas(this.addplacas.controls);
    // this.errorsPlacaAddPlacas = errorsPlacaAddPlacas;
    // this.errorsEstadoAddPlacas = errorsEstadoAddPlacas;
    // this.errorsPlacaPlacas = errorsPlacaPlacas;
    // this.errorsEstadoPlacas = errorsEstadoPlacas;
    // if(this.formCamiones.invalid){
    //   Camion.Mensaje('Formulario invalido');
    //   return;
    // }
    // const { id_historial,id_gastos,id_rutas,id_usuario,placas, addplacas,niv,num_serie } = this.formCamiones.value;
    // // valida si el numero se serie y el NIV  son iguales
    // if(num_serie !== niv){
    //   Camion.Mensaje('El NIV y el numero de serie deben de ser iguales');
    //   return;
    // }
    // if(placas.length> 0 || addplacas.length > 0){
    //   Camion.Addplacas(placas,addplacas,this.activa,this.data);
    //   this.mensaje = Camion.PlacaActiva(this.activa);
    //   if(this.mensaje !== ''){
    //     Camion.Mensaje(this.mensaje);
    //     return;
    //   }
    //   this.mensaje = Camion.PlacaRepetida(this.data);
    //   if(this.mensaje !== ''){
    //     Camion.Mensaje(this.mensaje);
    //     return;
    //   }
    // }
    // this.addUpdate = true;
    // if(this.btn == 'Actualizar'){
    //   Camion.update(this.service,this.id,this.router,this.formCamiones, this.data, id_historial, id_gastos, id_rutas, id_usuario);
    //   return ;
    // }
    // Camion.add(this.service,this.router,this.formCamiones, this.data, id_historial, id_gastos, id_rutas, id_usuario);
  }
  // Function para agregar un formulario para nueva placa
  add(array:any){
    // const placaFormGroup = this.formBuilder.group(addPlaca);
    // this.addplacas.push(placaFormGroup);
    // this.data.placas=[];
    // this.activa=[]
  }
  // // fuctions para eliminar un formulario para una placa
  delete(index: number, array:any) {
    switch(array){
      case 'gasto':

        break;
      case 'placas':

        break;
    }
    // this.data.placas = [];
    // this.activa = [];
    // this.addplacas.removeAt(index);
  }
}
