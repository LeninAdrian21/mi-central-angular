import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  ChangePasswordForm!: FormGroup;
  tokenEmail:any;
  constructor(private router:Router, private service:AuthService, private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.ChangePasswordForm = this.formBuilder.group({
      new_password:['',[Validators.required, Validators.minLength(6)]],
      confirm_password:['',[Validators.required, Validators.minLength(6)]]
    });
    this.tokenEmail = localStorage.getItem('tokenEmail');
  }
  ChangePassword(){
    if(this.ChangePasswordForm.invalid){
      return alert('Formulario invalido');
    }
    this.service.ChangePassword(this.tokenEmail,this.ChangePasswordForm.value).subscribe((data:any) => {
      alert('Pasword change')
      localStorage.removeItem('tokenEmail');
      this.router.navigate(['/auth/login']);
    }, error => {
      alert(error);
      console.error(error);
    });
  }
}
