import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, throwError as observableThrowError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetRolService {
  constructor(private http: HttpClient) { }
  Headers = (token:string ) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*Access-Control-Allow-Origin: http://localhost:4200',
      'authenticated': 'Bearer ' + token
    });
    return headers;
  }
  handleError(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server error');
  }
  public decryptRol(body:any, token: string,){
    return this.http.post('/api/usuarios/decrypt', body,{headers:this.Headers(token)})
    .pipe(catchError(this.handleError))
  }
}

