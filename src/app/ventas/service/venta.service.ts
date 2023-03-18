import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private carritosSubject = new BehaviorSubject<any>([]);
  carritos$ = this.carritosSubject.asObservable();
  private localesSubject = new BehaviorSubject<any>([]);
  locales$ = this.localesSubject.asObservable();
  private rutasSubject = new BehaviorSubject<any>([]);
  rutas$ = this.rutasSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  private vendedorSubject = new BehaviorSubject<any>([]);
  private metodosPagoSubject = new BehaviorSubject<any>([]);
  metodosPago$ = this.metodosPagoSubject.asObservable();
  vendedor$ = this.vendedorSubject.asObservable();
  jwt: any = localStorage.getItem('jwt');
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.carritos();
    this.locales();
    this.metodoPago();
    this.rutas();
    this.usuarios();
    this.vendedor();
  }
  carritos(){
    this.service.get('carritos',this.token).subscribe(
      (data: any) => {
        this.carritosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  locales(){
    this.service.get('locals', this.token).subscribe(
      (data: any) => {
        this.localesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  metodoPago(){
    this.service.get('metodos-de-pagos', this.token).subscribe(
      (data: any) => {
        this.metodosPagoSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  rutas(){
    this.service.get('rutas', this.token).subscribe(
      (data: any) => {
        this.rutasSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  usuarios(){
    this.service.get('usuarios',this.token).subscribe(
      (data: any) => {
        this.usuariosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  vendedor(){
    this.service.get('vendedor-s', this.token).subscribe(
      (data: any) => {
        this.vendedorSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
}
