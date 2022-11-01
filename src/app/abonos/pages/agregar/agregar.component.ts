import { VariablesService } from './../../../core/service/variables.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { abonosForm } from 'src/functions/form';
import { abonoId, Add} from 'src/functions/functions';
import { AbonoService } from '../../service/abono.service';
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
    private variables: VariablesService
  ) {
    this.data$ = variables.DataValidatorObservable;
  }
  ngOnInit(): void {
    const fecha = new Date();
    this.token = localStorage.getItem('token');
    this.id = this.route.snapshot.params['id'];
    this.addAbonos = this.formBuilder.group(abonosForm);
    this.addAbonos.patchValue({
      fecha_abono: fecha,
    });
    this.token = localStorage.getItem('token');
    if (this.id) {
      this.btn = 'Actualizar';
      this.title = 'Actualizar Abono';
      this.service.get('abonos/'+this.id, this.token).subscribe(
        (data:any) =>{
          console.log(data)
        },
        (error:any) => {
          console.log(error);
          alert('Error al agregar');
        }
      )
      abonoId(this.service, 'abonos/' + this.id, this.addAbonos);
    }
  }
  addAbono() {
    if (!this.addAbonos.valid) {
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const fecha = new Date();
    delete this.addAbonos.value.credito_id, this.addAbonos.value.usuario_id;
    this.body = Object.assign(this.addAbonos.value);
    if (this.addAbonos.value.credito_id) {
      const credito = {
        credito: {
          _id: this.addAbonos.value.credito_id,
        },
      };
      this.body = Object.assign(this.body, credito);
    }
    if (this.addAbonos.value.usuario_id) {
      const usuario = {
        usuario: {
          _id: this.addAbonos.value.usuario_id,
        },
      };
      this.body = Object.assign(this.body, usuario);
    }
    if (this.btn == 'Actualizar') {
      return this.Update();
    }
    const fecha_abono = {
      fecha_abono: fecha,
    };
    this.body = Object.assign(this.body, fecha_abono);
    console.log(this.addAbonos.value);

    Add('abonos',this.body,this.service,this.router,'Abono agregado correctamente','/abonos/listar');
  }
  Update() {
    localStorage.setItem('carga', 'true');
    this.carga = localStorage.getItem('carga');
    this.service
      .update('abonos', this.id, this.body, this.token)
      .subscribe(data => {
        localStorage.setItem('carga', 'false');
        this.carga = localStorage.getItem('carga');
        setTimeout(() => {
          this.router.navigate(['/abonos/listar']);
          alert('Abono Actualizado');
          this.service.addCampo = true;
        }, 1000);
      });
  }
}
