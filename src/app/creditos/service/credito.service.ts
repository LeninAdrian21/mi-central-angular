import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class CreditoService {
  private abonosSubject = new BehaviorSubject<any>([]);
  abonos$ = this.abonosSubject.asObservable();
  private metodoPagoSubject = new BehaviorSubject<any>([]);
  metodoPago$ = this.metodoPagoSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.abonos();
    this.metodoPagos();
    this.usuarios();
  }
  abonos() {
    this.service.get('abonos', this.token).subscribe(
      (data: any) => {
        this.abonosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  metodoPagos() {
    this.service.get('metodos-de-pagos',  this.token).subscribe(
      (data: any) => {
        this.metodoPagoSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  usuarios(){
    this.service.get('usuarios', this.token).subscribe(
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
