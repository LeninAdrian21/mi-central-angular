import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosSubject = new BehaviorSubject<any>([]);
  productos$ = this.productosSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.productos();
    this.usuarios();
  }
  productos(){
    this.service.get('productos',  this.token).subscribe(
      (data: any) => {
        this.productosSubject.next(data);
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
