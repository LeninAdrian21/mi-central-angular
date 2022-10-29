import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { localesForm } from 'src/functions/form';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { Add, localesId, Update } from 'src/functions/functions';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  addLocales!: FormGroup;
  id: any;
  btn: string = 'Agregar';
  title: string = 'Agregar local';
  usuarios$ = this.get.usuarios$;
  ventas$ = this.get.ventas$;
  body: any;
  constructor(
    private service: CrudService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private get: LocalService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addLocales = this.formBuilder.group(localesForm);
    this.addLocales.patchValue({
      status: false,
    });
    if (this.id) {
      this.btn = 'Actualizar';
      this.title = 'Actualizar Local';
      localesId(this.service, 'locals/' + this.id, this.addLocales);
    }
  }

  addLocal() {
    this.addLocales.value.numero_ext =
      this.addLocales.value.numero_ext.toString();
    this.addLocales.value.numero_int =
      this.addLocales.value.numero_int.toString();
    this.addLocales.value.cp = this.addLocales.value.cp.toString();
    this.addLocales.value.latitud = this.addLocales.value.latitud.toString();
    this.addLocales.value.longitud = this.addLocales.value.longitud.toString();
    this.addLocales.value.telefono = this.addLocales.value.telefono.toString();
    this.addLocales.value.telefono_cel =
      this.addLocales.value.telefono_cel.toString();
    const { id_usuario, id_ventas } = this.addLocales.value;
    delete this.addLocales.value.id_usuario;
    delete this.addLocales.value.id_ventas;
    this.body = Object.assign(this.addLocales.value);
    if (id_usuario) {
      const usuario = {
        usuario: [
          {
            _id: id_usuario,
          },
        ],
      };
      this.body = Object.assign(this.body, usuario);
    }
    if (id_ventas) {
      const ventas = {
        ventas: [
          {
            _id: id_ventas,
          },
        ],
      };
      this.body = Object.assign(this.body, ventas);
    }
    let { telefono, telefono_cel } = this.addLocales.value;
    if (!this.addLocales.valid) {
      return alert('Faltan campos por llenar y/o no son validos');
    }
    telefono = telefono.toString();
    telefono_cel = telefono_cel.toString();
    if (telefono.length == 10 && telefono_cel.length == 10) {
      if (this.btn == 'Actualizar') {
        console.log(this.body);
        return Update(
          'locals',
          this.id,
          this.body,
          this.router,
          this.service,
          'Local actualizado correctamnte',
          '/locales/listar'
        );
      }
      Add(
        'locals',
        this.body,
        this.service,
        this.router,
        'Local agregado correctamente',
        '/locales/listado'
      );
    } else {
      return alert('Los numero de celular deben tener 10 digitos');
    }
  }
}
