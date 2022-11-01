import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
@Injectable({
  providedIn: 'root',
})
export class CompraService {
  private metodoPagoSubject = new BehaviorSubject<any>([]);
  metodoPago$ = this.metodoPagoSubject.asObservable();
  private lotesSubject = new BehaviorSubject<any>([]);
  lotes$ = this.lotesSubject.asObservable();
  private proveedoresSubject = new BehaviorSubject<any>([]);
  proveedores$ = this.proveedoresSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.metodoPagos();
    this.lotes();
    this.proveedores();
  }
  metodoPagos() {
    this.service.get('metodo-pagos',  this.token).subscribe(
      (data: any) => {
        this.metodoPagoSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  lotes() {
    this.service.get('lotes', this.token).subscribe(
      (data: any) => {
        this.lotesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  proveedores() {
    this.service.get('proveedors', this.token).subscribe(
      (data: any) => {
        this.proveedoresSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
}
