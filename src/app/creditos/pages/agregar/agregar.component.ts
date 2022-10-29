import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { GetCrudService } from 'src/app/services/get-crud.service';
import { creditosForm } from 'src/functions/form';
import { Add, creditoId, Update } from 'src/functions/functions';
import { CreditoService } from '../../service/credito.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  usuario$ = this.get.usuarios$;
  metodo_pago$ = this.get.metodoPago$;
  abonos$ = this.get.abonos$;
  addCreditos!: FormGroup;
  id :string ="";
  btn: string = "Agregar";
  title: string = "Agregar Credito";
  body: any;
  constructor(private service:CrudService,private formBuilder:FormBuilder,private router:Router, private route:ActivatedRoute, private get: CreditoService) { }
  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.addCreditos = this.formBuilder.group(creditosForm);
    if (this.id){
      this.btn = "Actualizar";
      this.title = "Actualizar Credito";
      creditoId(this.service,'creditos/'+this.id, this.addCreditos);
    }
  }

  addCredito(){
    if (!this.addCreditos.valid){
     return alert('Faltan campos por llenar y/o no son validos');
    }
    const {id_usuario,id_metodoPago,id_abonos} = this.addCreditos.value;
    delete this.addCreditos.value.id_usuario
    delete this.addCreditos.value.id_metodoPago
    delete this.addCreditos.value.id_abonos
     this.body = Object.assign(this.addCreditos.value);
    if (id_usuario){
      const usuario = {
        usuario:{
          _id:id_usuario
        }
      }
      this.body = Object.assign(this.body, usuario)
    }
    if(id_metodoPago){
      const metodoPago = {
        metodos_de_pago:{
          _id:id_metodoPago
        },
      }
      this.body= Object.assign(this.body, metodoPago)
    }
    if(id_abonos){
      const abonos = {
        abonos:[
          {
            _id:id_abonos
          }
        ]
      }
      this.body = Object.assign(this.body, abonos)
    }



    if(this.btn =="Actualizar"){
      return Update('creditos',this.id,this.body,this.router,this.service,'Credito actualizado correctamente ','/creditos/listar');
    }
    Add('creditos',this.body, this.service, this.router,'Credito agregado correctamente','/creditos/listar')
    // this.service.add('creditos',this.addCreditos.value,this.jwt,this.token).subscribe(
    //   (data) => {
    //     console.log(data);
    //     alert("Credito agregado correctamente");
    //     this.router.navigate(['/creditos/listar']);
    //     this.service.addCampo = true;
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert('Error al agregar');
    //   }
    // );
  }

}
