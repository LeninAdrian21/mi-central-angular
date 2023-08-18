import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private carritosSubject = new BehaviorSubject<any>([]);
  carritos$ = this.carritosSubject.asObservable();
  private dimensionesSubject = new BehaviorSubject<any>([]);
  dimensiones$ = this.dimensionesSubject.asObservable();
  private lotesSubject = new BehaviorSubject<any>([]);
  lotes$ = this.lotesSubject.asObservable();
  private promocionesSubject = new BehaviorSubject<any>([]);
  promociones$ = this.promocionesSubject.asObservable();
  private proveedoresSubject = new BehaviorSubject<any>([]);
  proveedores$ = this.proveedoresSubject.asObservable();
  jwt: any = localStorage.getItem('jwt');
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.dimensiones();
    this.lotes();
    this.promociones();
    this.proveedores();
    this.carritos();
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
  dimensiones(){
    this.service.get('dimensiones',  this.token).subscribe(
      (data: any) => {
        this.dimensionesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  lotes(){
    this.service.get('lotes',  this.token).subscribe(
      (data: any) => {
        this.lotesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  promociones(){
    this.service.get('promociones', this.token).subscribe(
      (data: any) => {
        this.promocionesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  proveedores(){
    this.service.get('proveedors',  this.token).subscribe(
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
