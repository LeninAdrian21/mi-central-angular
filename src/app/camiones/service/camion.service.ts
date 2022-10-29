import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
@Injectable({
  providedIn: 'root'
})
export class CamionService {
  private gastosSubject = new BehaviorSubject<any>([]);
  gastos$ = this.gastosSubject.asObservable();
  private historialesSubject = new BehaviorSubject<any>([]);
  historiales$ = this.historialesSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  private rutasSubject = new BehaviorSubject<any>([]);
  rutas$ = this.rutasSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.gastos();
    this.historiales();
    this.usuarios();
    this.rutas();
  }

  gastos(){
    this.service.get('gastos',this.token).subscribe(
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
    this.service.get('historials',  this.token).subscribe(
      (data: any) => {
        this.historialesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  rutas(){
    this.service.get('rutas',  this.token).subscribe(
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
