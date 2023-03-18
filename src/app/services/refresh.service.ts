import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  catchError, throwError as observableThrowError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  api:string = environment.API_URL
  constructor(private http: HttpClient) { }
  Headers = () => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*Access-Control-Allow-Origin: http://localhost:4200',

    });
    return headers;
  }
  handleError(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server error');
  }
  public get(url:string) {
    return this.http.get('/api/'+ url, {headers: this.Headers()})
    .pipe(catchError(this.handleError));
  }
}

