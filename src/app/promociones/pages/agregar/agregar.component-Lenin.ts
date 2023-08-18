import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Add, promocionesId, Update } from 'src/functions/functions';
import { PromocionService } from '../../service/promocion.service';
import { promocionesForm } from '../../functions/form';
import { Promocion } from '../../functions/functions';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  productos$ = this.get.productos$;
  formPromociones!: FormGroup;
  // el id y el cuerpo de la peticion
  id:any;
  //texto dinamicos
  btn:string="Agregar";
  title:string = "Agregr Promocion";
  // Cambios en la interfaz;
  cargaOptions = false;
  submitted = false;
  // boton de Loading en la interfas
  addUpdate = false;
  constructor(
    private formBuilder: FormBuilder,
    private get:PromocionService,
    private service:CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formPromociones = this.formBuilder.group(promocionesForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Promocion";
      // promocionesId(this.service,'promociones/'+ this.id,this.formPromociones);
    }
  }
  formPromocion(){
    this.submitted = true;
    if (this.formPromociones.invalid){
      Promocion.Mensaje('Formulario invalido')
      return;
    }
    const {id_productos} = this.formPromociones.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Promocion.update(this.service,this.id,this.router,this.formPromociones,id_productos);
      return;
    }
    Promocion.add(this.service,this.router,this.formPromociones,id_productos);
  }
}
