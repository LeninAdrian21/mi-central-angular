import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError} from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  handleError(error: HttpErrorResponse) {
    return observableThrowError(error.message );
  }
  Login(user:any) {
    return this.http
      .post('/api/usuarios/loggin', user)
      .pipe(
        catchError(this.handleError)
      );
  }
  Refresh(user:any) {
    return this.http
      .post('/api/usuarios/refresh', user)
      .pipe(
        catchError(this.handleError)
      );
  }
  Register(body:any) {
    return this.http
               .post('/api/usuarios', body)
                .pipe(
                  catchError(this.handleError)
                );
  }
  PasswordRecover(body:any){
    return this.http
            .post('/api/usuarios/password_recover', body)
            .pipe(
              catchError(this.handleError)
            );
  }
  EmailValidator(tokenEmail:any){
    return this.http
            .get('/api/usuarios/email_validator/'+tokenEmail)
            .pipe(
              catchError(this.handleError)
            );
  }
  ChangePassword(tokenEmail:any,body:any){
    return this.http
            .post('/api/usuarios/password_change/'+tokenEmail,body)
            .pipe(
              catchError(this.handleError)
            );
  }
}
