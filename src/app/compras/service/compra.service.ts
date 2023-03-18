import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';
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
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.metodoPagos();
    this.lotes();
    this.proveedores();
    this.usuarios();
  }
  metodoPagos() {
    this.service.get('metodo-pagos',  this.token).subscribe(
      (data: any) => {
        this.metodoPagoSubject.next(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los metodos de pago en el formulario',
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los lotes en el formulario',
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los proveedores en el formulario',
        })
      }
    );
  }
  usuarios() {
    this.service.get('usuarios', this.token).subscribe(
      (data: any) => {
        this.usuariosSubject.next(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los usuarios en el formulario',
        })
      }
    );
  }
}
