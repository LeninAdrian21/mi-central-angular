import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Register } from '../../functions/form';
import Swal from 'sweetalert2';
import { Auth } from '../../functions/functions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  body:any;
  status: any;
  siteKey:string ="6LeDZVkkAAAAAAieZFHU4io4Qec9n2BPOBB-Jt3c";
  submitted = false;
  constructor(
    private formBuilder:FormBuilder,
    private service:AuthService, private router:Router, ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(Register);
  }
  Register() {
    this.submitted = true;
    if(this.registerForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan datos en el formulario',
      });
      return
    }
    this.body = Auth.Relations(this.registerForm);
    console.log(this.body);
    Auth.register(this.service,this.body,this.router);
  }
}
