import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private camionesSubject = new BehaviorSubject<any>([]);
  camiones$ = this.camionesSubject.asObservable();
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.camiones();
    this.ventas();
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
