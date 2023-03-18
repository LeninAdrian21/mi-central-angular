import { VariablesService } from './../../../core/service/variables.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { abonosForm } from 'src/functions/form';
import { abonoId } from 'src/functions/functions';
import { AbonoService } from '../../service/abono.service';
import { Abono } from '../../function/functions';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  usuarios$ = this.get.usuarios$;
  creditos$ = this.get.creditos$;
  addAbonos!: FormGroup;
  token: any;
  id: any;
  btn: string = 'Agregar';
  title: string = 'Agregar Abono';
  body: any;
  public carga: any;
  private data$: Observable<any>;
  constructor(
    private service: CrudService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private get: AbonoService,
  ) {
    this.data$ = variables.DataValidatorObservable;
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.id = this.route.snapshot.params['id'];
    this.addAbonos = this.formBuilder.group(abonosForm);
    this.token = localStorage.getItem('token');
    if (this.id) {
      this.btn = 'Actualizar';
      this.title = 'Actualizar Abono';
      abonoId(this.service, 'abonos/' + this.id, this.addAbonos);
    }
  }
  addAbono() {
    if (!this.addAbonos.valid) {
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const fecha = new Date();
    const {usuario_id, credito_id} = this.addAbonos.value;
    delete this.addAbonos.value.credito_id
    delete this.addAbonos.value.usuario_id;
    this.body = Object.assign(this.addAbonos.value);
    // const {Body,Fecha} = Abono;
    // Body(credito_id,usuario_id,this.body);
    // if (this.btn == 'Actualizar') {
    //   return this.Update('abonos',this.id, this.body,this.token,'Abono Actualizado','/abonos/listar');
    // }
    // Fecha(fecha, this.body);
    // this.Add(
    //   'abonos',
    //   this.body,
    //   this.service,
    //   this.router,
    //   'Abono agregado correctamente',
    //   '/abonos/listar',
    //   this.token
    // );
  }
  Add(
    url: string,
    body: {},
    service: any,
    router: any,
    mensaje: any,
    navigate: any,
    token: any)
  {
    localStorage.setItem('carga', 'true');
    this.carga = localStorage.getItem('carga');
    service.add(url, body, token).subscribe(
      (data: any) => {
        localStorage.setItem('carga', 'false');
        this.carga = localStorage.getItem('carga');
        setTimeout(() => {
          alert(mensaje);
          router.navigate([navigate]);
          service.addCampo = true;
        }, 1000);
      },
      (error: any) => {
        console.log(error);
        alert('Error al agregar');
      }
    );
  }
  Update(url:any,id:any,body:{},token:any,mensaje:String,navigate:String) {
    localStorage.setItem('carga', 'true');
    this.carga = localStorage.getItem('carga');
    this.service.update(url, id, body, token).subscribe(
      (data) => {
        setTimeout(() => {
          alert(mensaje);
          this.router.navigate([navigate]);
          this.service.addCampo = true;
        }, 1000);
      },
      (error: any) => {
        console.log(error);
        alert('Error al actualizar');
      }
    );
  }
  Prueba(){

  }
}
