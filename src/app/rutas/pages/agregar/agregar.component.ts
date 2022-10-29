import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonoService } from 'src/app/abonos/service/abono.service';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { rutasForm } from 'src/functions/form';
import { Add, rutasId, Update } from 'src/functions/functions';
import { RutaService } from '../../service/ruta.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  ventas$ = this.get.ventas$;
  camiones$ = this.get.camiones$;
  addRutas!: FormGroup;
  id:any;
  btn: string = "Agregar";
  title: string = "Agregar Ruta";
  body:any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get:RutaService ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addRutas = this.formBuilder.group(rutasForm);
    if (this.id){
      console.log(this.id)
      this.btn = "Actualizar";
      this.title = "Actualizar Ruta";
      rutasId(this.service,'rutas/' +this.id, this.addRutas);
    }
  }
  addRuta(){
    if (!this.addRutas.valid){
      return alert('Faltan campos por llenar y/o no son validos');
    }
    const {monto_venta,num_serie_camion} = this.addRutas.value;
    delete this.addRutas.value.monto_venta;
    delete this.addRutas.value.num_serie_camion;
    this.body = Object.assign(this.addRutas.value)
    if (monto_venta){
      const ventas ={
        ventas:[
          {
            _id:monto_venta
          }
        ]
      }
      this.body = Object.assign(this.body, ventas);
    }
    if(num_serie_camion){
      const camions ={
        camions:[
          {
            _id:num_serie_camion
          }
        ]
      }
      this.body = Object.assign(this.body, camions);
    }
    if(this.btn =="Actualizar"){
      return Update('rutas',this.id,this.body,this.router,this.service,'Ruta actualizada con exito','/rutas/listar');
    }
    Add('rutas',this.body,this.service,this.router,'Ruta agregada correctamente','/rutas/listar');
  }
}
