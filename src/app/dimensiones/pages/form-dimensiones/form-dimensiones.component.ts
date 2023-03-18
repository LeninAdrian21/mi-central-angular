import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DimensionService } from '../../service/dimension.service';
import { CrudService } from '../../../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { dimensionesForm } from '../../functions/form';
import { Dimension } from '../../functions/functions';


@Component({
  selector: 'app-agregar',
  templateUrl: './form-dimensiones.component.html',
  styleUrls: ['./form-dimensiones.component.scss']
})
export class FormDimensionesComponent implements OnInit {
   // Formaulario
   productos$ = this.get.productos$;
   formDimensiones!: FormGroup;
   // el id y el cuerpo de la peticion
   id:any;
   //texto dinamicos
   btn:string = 'Agregar';
   title:string = 'Agregar Dimension';
   // Cambios en la interfaz;
   cargaOptions = false;
   submitted = false;
   // boton de Loading en la interfas
   addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get: DimensionService,
    private service: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formDimensiones = this.formBuilder.group(dimensionesForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Dimension.DimensionId(this.service,'dimensiones/'+this.id,this.formDimensiones);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formDimension(){
    this.submitted = true;
    if(this.formDimensiones.invalid){
      Dimension.Mensaje('Formulario invalido')
      return;
    }
    const {id_productos} = this.formDimensiones.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Dimension.update(this.service,this.id,this.router,this.formDimensiones,id_productos);
      return;
    }
    Dimension.add(this.service,this.router,this.formDimensiones,id_productos);
  }
}
