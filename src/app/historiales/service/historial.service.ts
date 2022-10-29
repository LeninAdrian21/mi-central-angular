import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  private camionesSubject = new BehaviorSubject<any>([]);
  camiones$ = this.camionesSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.camiones();
    this.usuarios();
  }
  camiones(){
    this.service.get('camiones',  this.token).subscribe(
      (data: any) => {
        this.camionesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
      );
  }
  usuarios(){
    this.service.get('usuarios',  this.token).subscribe(
      (data: any) => {
        this.usuariosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
}
