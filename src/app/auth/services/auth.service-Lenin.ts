import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError as observableThrowError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolsSubject = new BehaviorSubject<any>([]);
  rols$ = this.rolsSubject.asObservable();
  constructor(private http:HttpClient, private service: CrudService) {
    this.Rols();
  }
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
  Rols(){
    this.service.get('tipo-rols',localStorage.getItem('token')!).subscribe(
      (data: any) => {
        this.rolsSubject.next(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los creditos en el formulario',
        })
      }
    );
  }
}
