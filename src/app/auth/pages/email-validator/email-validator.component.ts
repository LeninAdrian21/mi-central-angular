import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-validator',
  templateUrl: './email-validator.component.html',
  styleUrls: ['./email-validator.component.scss']
})
export class EmailValidatorComponent implements OnInit {
  tokenEmail:any;
  data:any;
  constructor(private route:ActivatedRoute, private router:Router, private service:AuthService) { }

  ngOnInit(): void {
    this.tokenEmail = this.route.snapshot.params['jwt'];
    this.emailValidator(this.tokenEmail);
  }
  emailValidator(tokenEmail:any){
    this.service.EmailValidator(tokenEmail).subscribe((data:any) => {
      const {token,msj} = data;
      localStorage.setItem('tokenEmail', token);
      this.router.navigate(['/auth/change-password'])
    }, error => {
      alert('Error al querer cambiar tu contraseña')
      console.log(error);
    });
  }
}
