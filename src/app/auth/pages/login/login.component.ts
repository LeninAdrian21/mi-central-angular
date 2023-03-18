import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { Login } from '../../functions/form';
import { Auth } from '../../functions/functions';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { VariablesService } from '../../../core/services/variables.service';
import { GetRolService } from 'src/app/services/get-rol.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted:boolean = false;
  loginForm!: FormGroup;
  mesaje:any;
  body:any;
  decoded:any;
  constructor(private router:Router, private service:AuthService, private formBuilder:FormBuilder,private recaptchaV3Service: ReCaptchaV3Service, private variable: VariablesService, private getRol: GetRolService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(Login);
  }
  Login() {
    this.submitted = true;
    this.loginForm.value.email = this.loginForm.value.email.toLowerCase();
    if(this.loginForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan datos en el formulario',
      });
      return
    }
    this.recaptchaV3Service.execute('')
    .subscribe((token) => {
      this.body = Object.assign(this.loginForm.value,{recaptcha:token});
      Auth.login(this.service,this.loginForm,this.router, this.variable, this.getRol);
    });
  }

}
