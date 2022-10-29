import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Add, camionId, Update } from 'src/functions/functions';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { CamionService } from '../../service/camion.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  addCamiones!: FormGroup;
  id:any;
  historiales$ = this.get.historiales$;
  gastos$ = this.get.gastos$;
  rutas$ = this.get.rutas$;
  usuarios$ = this.get.usuarios$;
  btn:string='Agregar';
  title:string='Agregar Camion';
  placas_camion:any;
  body:any;
  data:any ={
    placas:[]
  }
  activa:any = [];
  btn_add_placa:any;
  validate_placa = false;
  error1:any;
  error2:any;
  error3: any;
  error4: any;
  constructor(private service:CrudService,private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute, private get:CamionService) { }
  get placas() {
    return this.addCamiones.get('placas') as FormArray;
  }
  get getplacas(){
    return this.addCamiones.get('addplacas') as FormArray;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addCamiones = this.formBuilder.group({
      num_serie: ['',[Validators.required]],
      niv:['',[Validators.required]],
      id_historial:[''],
      id_gastos:[''],
      id_rutas:[''],
      id_usuario:[''],
      placas:this.formBuilder.array([]),
      addplacas:this.formBuilder.array([]),
    });
    if (this.id){
      // this.camion(this.id);
      camionId(this.service,'camiones/'+ this.id, this.addCamiones, this.formBuilder, Validators, this.placas);
      this.btn = "Actualizar"
      this.title = "Actualizar Camion"
    }
  }
  filter(valor:any, indice:any, lista:any) {
    return !(lista.indexOf(valor) === indice);
  }
  addCamion(){
    this.data.placas = [];
    this.activa = [];
    if (!this.addCamiones.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }

    const {placas, addplacas } = this.addCamiones.value;
    if(placas){
      for (let i = 0; i < placas.length; i++) {
        placas[i].placa = placas[i].placa.toUpperCase();
        placas[i].estado = placas[i].estado.toUpperCase();
      }
      placas.forEach((element:any)=> {
        this.data.placas.push(element);
        this.activa.push(element.activa)
      });
    }
    if(addplacas){
      addplacas.forEach((element: any) =>{
         this.data.placas.push(element);
         this.activa.push(element.activa)
      });
    }
    if(this.activa.length > 0){
      const found = this.activa.find((element:any) => element == true)
      if(!found){
        return alert('Tienes que poner una placa activa');
      }
      this.activa = this.activa.filter((item:any)=> item !== false)
      if(this.activa.some(this.filter)){
        return alert('No puede ver mas de 1 placa activa');
      }
    }
    delete this.addCamiones.value.placas;
    delete this.addCamiones.value.addplacas;
    this.body = Object.assign(this.addCamiones.value, this.data);
    if(this.addCamiones.value.id_historial){
      const historial = {
        historial: {
          _id: this.addCamiones.value.id_historial
        }
      }
      this.body = Object.assign(this.body, historial);
    }
    if(this.addCamiones.value.id_gastos){
      const gastos ={
        gastos:[
          {
            _id:this.addCamiones.value.id_gastos
          }
        ]
      }
      this.body = Object.assign(this.body, gastos);
    }
    if(this.addCamiones.value.id_rutas){
      const rutas = {
        rutas:[
          {
            _id:this.addCamiones.value.id_rutas
          }
        ]
      }
      this.body = Object.assign(this.body, rutas);
    }
    if(this.addCamiones.value.id_usuario){
      const usuario = {
        usuario:{
          _id:this.addCamiones.value.id_usuario
        }
      }
      this.body = Object.assign(this.body, usuario);
    }
    delete this.addCamiones.value.id_historial
    delete this.addCamiones.value.id_gastos
    delete this.addCamiones.value.id_rutas
    delete this.addCamiones.value.id_usuario;
    const num_serie = this.addCamiones.value.num_serie.toString();
    const niv = this.addCamiones.value.niv.toString();
    if(num_serie.length == 17 && niv.length == 17 && num_serie == niv){
      this.validatePlaca();
      this.body.num_serie = this.body.num_serie.toString();
      this.body.niv = this.body.niv.toString();
      if(this.validate_placa){
        if(this.btn =="Actualizar"){
          return Update('camiones',this.id, this.body,this.router,this.service,'Camion actualizado con exito','/camiones/listar');
        }
        Add('camiones',this.body,this.service, this.router,'Camion agregado correctamente','/camiones/listar');
      }else{
        alert(`${this.error1}\n${this.error2}\n${this.error3}\n${this.error4}\n`);
      }

    }else{
      alert('Hace falta datos en el numero de serie o en el numero de identificacion vehicular camion deben de ser 17 caracteres o son diferentes')
    }
  }
  addPlaca(){
    const placaFormGroup = this.formBuilder.group({
      placa: ['',[Validators.required]],
      activa: ['',[Validators.required]],
      estado: ['',[Validators.required,Validators.minLength(5), Validators.maxLength(17)]],
    });
    placaFormGroup.patchValue({
      activa: false,
    })
    this.getplacas.push(placaFormGroup);
    this.data.placas = []
    this.activa = []
  }
  deleteTelefono(index: number) {
    this.data.placas = []
    this.activa = []
    this.getplacas.removeAt(index);
  }
  validatePlaca(){
    this.error1 = '';
    this.error2 = '';
    this.error3 = '';
    this.error4 = '';
    this.validate_placa = false;
    const {placas} = this.body;
    let placa:any =[];
    placas.forEach((element:any) => {
      placa.push(element.placa);
    });
    if(placa.some(this.noEsPrimero)){
      this.error1 = 'Alguna placa se encuentra repetida'
    }
    placas.forEach((element:any) => {
      if(element.placa.includes('I') || element.placa.includes('Ñ') || element.placa.includes('O') || element.placa.includes('Q') || element.placa.includes('-')){
        this.error2 = 'No se permiten las I,Ñ,O,Q y los guiones en las placas';
      }
      if(element.estado == 'CDMX' || element.estado == 'CIUDAD DE MEXICO' ){
        if(element.placa.length == 5 || element.placa.length == 6){

        }else{
           this.error3 = 'Si la placa es de la ciudad de mexico debe de tener 5 o 6 caracteres en la placa'
        }
      }else
      if(element.estado !== 'CDMX' && element.placa.length == 6){

      }else{
        this.error4 = 'Si la placa es diferente a la CDMX o Ciudad de México debe de contener 6 caracteres';
      }
    });
    if (this.error1 !=='' || this.error2 !=='' || this.error3 !=='' || this.error4 !==''){
      this.validate_placa = false;
    }else{
      this.validate_placa = true;
    }
  }
  noEsPrimero(valor:any, indice:any, lista:any) {
    return !(lista.indexOf(valor) === indice);
  }
}

