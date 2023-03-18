import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { rutasForm } from '../../functions/form';
import { Ruta } from '../../functions/functions';
import { RutaService } from '../../service/ruta.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  // Formaulario
  ventas$ = this.get.ventas$;
  camiones$ = this.get.camiones$;
  formRutas!: FormGroup;
  fecha:any = new Date();
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn: string = "Agregar";
  title: string = "Agregar Ruta";
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get:RutaService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formRutas= this.formBuilder.group(rutasForm);
    if (this.id){
      console.log(this.id)
      this.btn = "Actualizar";
      this.title = "Actualizar Ruta";
      Ruta.RutasId(this.service,'rutas/' +this.id, this.formRutas);
    }
  }
  addRuta(){
    this.submitted = true;
    if (this.formRutas.invalid){
      Ruta.Mensaje('Formulario invalido')
      return;
    }
    const {id_ventas,id_camiones} = this.formRutas.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Ruta.update(this.service,this.id,this.router,this.formRutas,id_ventas,id_camiones);
      return;
    }
    Ruta.add(this.service,this.router,this.formRutas,id_ventas,id_camiones);
  }
}
