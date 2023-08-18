import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Form } from 'src/functions/forms';
import { Funcions, Mensaje } from 'src/functions/functions';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fields:any;
  picker:any;
  addUpdate = false;
  // body:any;
  // status: any;
  // siteKey:string ="6LeDZVkkAAAAAAieZFHU4io4Qec9n2BPOBB-Jt3c";
  // submitted = false;
  constructor(
    private formBuilder:FormBuilder, private service: CrudService, private router:Router,private recaptchaV3Service: ReCaptchaV3Service ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({});
    this.fields = Form('usuarioRegister');
    this.fields.forEach((field:any) => {
      const validators = [];
      const isRolField = field.name == 'rol';
      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }
      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }
      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }
      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      const control = this.formBuilder.control({ value: field.default, disabled: isRolField ? true : field.disabled }, validators);
      this.registerForm.addControl(field.name,control);
    });
  }
  Register() {
    // this.submitted = true;
    // if(this.registerForm.invalid){
    //   Mensaje('Faltan datos en el formulario')
    //   return
    // }
    this.recaptchaV3Service.execute('')
      .subscribe(data =>{
        this.registerForm.value.recapcha = data;
        this.registerForm.value.rol = environment.User;
        console.log(this.registerForm.value);
        Funcions.add(this.service, this.router,this.registerForm.value,'usuarios', 'Usuarios', '/','Usuario agregado correctamente','Error al agregar Usuario');
      })
    // this.body = Auth.Relations(this.registerForm);
    // console.log(this.body);
    // Auth.register(this.service,this.body,this.router);
  }
}
