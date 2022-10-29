import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private router:Router, private service:AuthService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }
  Login() {
   this.loginForm.value.email = this.loginForm.value.email.toLowerCase();
    if (this.loginForm.valid) {
      this.service.Login(this.loginForm.value).subscribe((data:any) => {
        const {token} = data;
        const {tipo_rol} = data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('rol',tipo_rol);
        this.router.navigate(['/home']);
      }, error => {
        alert('Usuario o contraseña incorrectos');
        console.log(error);
      });
    }
    else{
      alert('Formulario invalido');
    }
  }
}
