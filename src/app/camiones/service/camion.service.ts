import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CamionService {
  private gastosSubject = new BehaviorSubject<any>([]);
  gastos$ = this.gastosSubject.asObservable();
  private historialesSubject = new BehaviorSubject<any>([]);
  historiales$ = this.historialesSubject.asObservable();
  private usuarioSubject = new BehaviorSubject<any>([]);
  usuario$ = this.usuarioSubject.asObservable();
  private rutasSubject = new BehaviorSubject<any>([]);
  rutas$ = this.rutasSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.gastos();
    this.historiales();
    this.usuario();
    this.rutas();
  }
  gastos(){
    this.service.get('gastos',this.token).subscribe(
      (data: any) => {
        this.gastosSubject.next(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los gastos en el formulario',
        })
      }
    );
  }
  historiales(){
    this.service.get('historials',this.token).subscribe(
      (data: any) => {
        this.historialesSubject.next(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los historiales en el formulario',
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar las rutas en el formulario',
        })
      }
    );
  }
  usuario(){
    this.service.get('usuarios',  this.token).subscribe(
      (data: any) => {
        this.usuarioSubject.next(data);
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
