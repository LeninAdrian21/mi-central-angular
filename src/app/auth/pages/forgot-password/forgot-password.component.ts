import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  constructor( private formBuilder:FormBuilder,private service:AuthService, private router:Router) { }
  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
    })
  }
  Login() {
    this.forgotPasswordForm.value.email = this.forgotPasswordForm.value.email.toLowerCase();
    if(this.forgotPasswordForm.invalid){
      return alert('Formulario invalido');
    }
    this.service.PasswordRecover(this.forgotPasswordForm.value).subscribe((data:any) => {
      console.log(data);
      alert('Se te ha enviado un correo');
      location.reload();
    }, error => {
      alert(error);
      console.log(error);
    });
  }
}
