import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerForm } from 'src/functions/form';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  body:any;
  status: any;
  constructor(private service:AuthService, private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(registerForm)
    this.loadStatus();
  }
  Register() {
    const rol ={
      tipo_rol:{
        _id: this.registerForm.value._id,
      }
    }
    delete this.registerForm.value._id;
    if(this.registerForm.value.status == ''){
      this.registerForm.value.status = false;
    }

    if (this.registerForm.valid) {
      const body = Object.assign(this.registerForm.value, rol);
      this.registerForm.value.nss = this.registerForm.value.nss.toString();
      this.registerForm.value.tel_cel = this.registerForm.value.tel_cel.toString();
      this.registerForm.value.numero = this.registerForm.value.numero.toString();
      this.registerForm.value.cp = this.registerForm.value.cp.toString();
      this.service.Register(body).subscribe(
        (data) => {
          console.log(data);
          alert("Usuario registrado correctamente");
          this.router.navigate(['/auth/login']);
        },(error) => {
          console.log(error);
          alert('Error al registrar');
        });
    }else{
      alert('Faltan campos por llenar y/o no son validos');
    }
  }
  loadStatus(){
    this.registerForm.patchValue(
      {
        status: false
      }
    );
  }

}
