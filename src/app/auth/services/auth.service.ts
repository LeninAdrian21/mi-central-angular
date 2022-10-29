import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  Register(body:any) {
    const userHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*Access-Control-Allow-Origin: http://localhost:4200',
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTQyZmM2MWJmODM1NGZjOGY0YzlkYiIsImlhdCI6MTY2MzE5NjYyMSwiZXhwIjoxNjYzODAxNDIxLCJhdWQiOiJhdWRpZW5jZSIsImlzcyI6Imlzc3VlciJ9.b6BtrJ28uPZ6MBi4GToHIICR5ftjTgI0_Icn5k-zwAg'
    });
    return this.http
               .post('/api/usuarios', body, {headers: userHeaders})
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
