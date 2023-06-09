import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { LocalService } from '../../service/local.service';
import { Local } from '../../functions/functions';
import { localesForm } from '../../functions/form';

@Component({
  selector: 'app-agregar',
  templateUrl: './form-locales.component.html',
  styleUrls: ['./form-locales.component.scss'],
})
export class FormLocalesComponent implements OnInit {

  // Formaulario
  usuarios$ = this.get.usuarios$;
  ventas$ = this.get.ventas$;
  formLocales!: FormGroup;
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
    private get: LocalService,
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.formLocales = this.formBuilder.group(localesForm);
    if(this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Abono";
      Local.LocalId(this.service,'locals/'+this.id,this.formLocales);
      setTimeout(()=>{
        this.cargaOptions = true;
      }, 10000)
    }
    setTimeout(()=>{
      this.cargaOptions = true;
    }, 10000)
  }
  formLocal(){
    this.submitted = true;
    console.log(this.formLocales.value);
    if(this.formLocales.invalid){
      Local.Mensaje('Formulario invalido');
      return;
    }
    const {id_ventas,id_usuarios} = this.formLocales.value;
    this.addUpdate = true;
    if(this.btn == 'Actualizar'){
      Local.update(this.service,this.id,this.router,this.formLocales,id_ventas,id_usuarios);
      return;
    }
    Local.add(this.service,this.router,this.formLocales,id_ventas,id_usuarios);
  }
  // addLocal() {
  //   this.addLocales.value.numero_ext =
  //     this.addLocales.value.numero_ext.toString();
  //   this.addLocales.value.numero_int =
  //     this.addLocales.value.numero_int.toString();
  //   this.addLocales.value.cp = this.addLocales.value.cp.toString();
  //   this.addLocales.value.latitud = this.addLocales.value.latitud.toString();
  //   this.addLocales.value.longitud = this.addLocales.value.longitud.toString();
  //   this.addLocales.value.telefono = this.addLocales.value.telefono.toString();
  //   this.addLocales.value.telefono_cel =
  //     this.addLocales.value.telefono_cel.toString();
  //   const { id_usuario, id_ventas } = this.addLocales.value;
  //   delete this.addLocales.value.id_usuario;
  //   delete this.addLocales.value.id_ventas;
  //   this.body = Object.assign(this.addLocales.value);
  //   if (id_usuario) {
  //     const usuario = {
  //       usuario: [
  //         {
  //           _id: id_usuario,
  //         },
  //       ],
  //     };
  //     this.body = Object.assign(this.body, usuario);
  //   }
  //   if (id_ventas) {
  //     const ventas = {
  //       ventas: [
  //         {
  //           _id: id_ventas,
  //         },
  //       ],
  //     };
  //     this.body = Object.assign(this.body, ventas);
  //   }
  //   let { telefono, telefono_cel } = this.addLocales.value;
  //   if (!this.addLocales.valid) {
  //     return alert('Faltan campos por llenar y/o no son validos');
  //   }
  //   telefono = telefono.toString();
  //   telefono_cel = telefono_cel.toString();
  //   if (telefono.length == 10 && telefono_cel.length == 10) {
  //     if (this.btn == 'Actualizar') {
  //       console.log(this.body);
  //       return Update(
  //         'locals',
  //         this.id,
  //         this.body,
  //         this.router,
  //         this.service,
  //         'Local actualizado correctamnte',
  //         '/locales/listar'
  //       );
  //     }
  //     Add(
  //       'locals',
  //       this.body,
  //       this.service,
  //       this.router,
  //       'Local agregado correctamente',
  //       '/locales/listado'
  //     );
  //   } else {
  //     return alert('Los numero de celular deben tener 10 digitos');
  //   }
  // }
}
