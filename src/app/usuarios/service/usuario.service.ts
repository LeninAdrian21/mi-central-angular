import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private abonosSubject = new BehaviorSubject<any>([]);
  abonos$ = this.abonosSubject.asObservable();
  private camionesSubject = new BehaviorSubject<any>([]);
  camiones$ = this.camionesSubject.asObservable();
  private carritosSubject = new BehaviorSubject<any>([]);
  carritos$ = this.carritosSubject.asObservable();
  private creditosSubject = new BehaviorSubject<any>([]);
  creditos$ = this.creditosSubject.asObservable();
  private gastosSubject = new BehaviorSubject<any>([]);
  gastos$ = this.gastosSubject.asObservable();
  private historialesSubject = new BehaviorSubject<any>([]);
  historiales$ = this.historialesSubject.asObservable();
  private localesSubject = new BehaviorSubject<any>([]);
  locales$ = this.localesSubject.asObservable();
  private metodoPagoSubject = new BehaviorSubject<any>([]);
  metodoPago$ = this.metodoPagoSubject.asObservable();
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.abonos();
    this.camiones();
    this.carritos();
    this.creditos();
    this.gastos();
    this.historiales();
    this.locales();
    this.metodoPago();
    this.ventas();
  }
  abonos(){
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
  carritos(){
    this.service.get('carritos', this.token).subscribe(
      (data: any) => {
        this.carritosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
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
  gastos(){
    this.service.get('gastos', this.token).subscribe(
      (data: any) => {
        this.gastosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  historiales(){
    this.service.get('historials', this.token).subscribe(
      (data: any) => {
        this.historialesSubject.next(data);
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
        this.metodoPagoSubject.next(data);
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
