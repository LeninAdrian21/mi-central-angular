import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class MedotoPagoService {
  private comprasSubject = new BehaviorSubject<any>([]);
  compras$ = this.comprasSubject.asObservable();
  private creditosSubject = new BehaviorSubject<any>([]);
  creditos$ = this.creditosSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.creditos();
    this.compras();
    this.usuarios();
    this.ventas();
  }
  creditos(){
    this.service.get('creditos', this.token).subscribe(
      (data: any) => {
        this.creditosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  compras(){
    this.service.get('compras',  this.token).subscribe(
      (data: any) => {
        this.comprasSubject.next(data);
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
  ventas(){
    this.service.get('ventas', this.token).subscribe(
      (data: any) => {
        this.ventasSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
}
