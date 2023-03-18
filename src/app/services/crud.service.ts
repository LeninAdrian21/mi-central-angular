import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpHeaders} from '@angular/common/http';
import {  throwError as observableThrowError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  addCampo:boolean = false;
  constructor(private http: HttpClient) {
  }
  api:string = environment.API_URL
  Headers = (token:string) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*Access-Control-Allow-Origin: http://localhost:4200',
      'authenticated': 'Bearer ' + token
    });
    return headers;
  }
  Refresh = (refresh:string) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*Access-Control-Allow-Origin: http://localhost:4200',
      'refresh': refresh
    });
    return headers;
  }
  handleError(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server error');
  }
  public refresh(url:string,  refresh:any) {
    return this.http.get('/api/'+ url, {headers: this.Refresh(refresh)})
    .pipe(catchError(this.handleError));
  }
  public get(url:string,  token:string) {
    return this.http.get('/api/'+ url, {headers: this.Headers( token)})
    .pipe(catchError(this.handleError));
  }
  public add(url:string, body:any,  token:string) {
    return this.http.post('/api/'+url, body, {headers: this.Headers(token)})
    .pipe(catchError(this.handleError));
  }
  public delete(url:string, id:string, token:any) {
    return this.http.delete('/api/'+ url +'/'+ id, {headers: this.Headers(token)})
    .pipe(catchError(this.handleError));
  }
  public update(url:string,id:string, body:any, token:string) {
    return this.http.put('/api/'+ url +'/'+ id, body, {headers: this.Headers(token)})
    .pipe(catchError(this.handleError));
  }
}
