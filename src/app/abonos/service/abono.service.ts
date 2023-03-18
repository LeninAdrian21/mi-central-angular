import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AbonoService {
  private creditosSubject = new BehaviorSubject<any>([]);
  creditos$ = this.creditosSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.creditos();
    this.usuarios();
  }
  creditos(){
    this.service.get('creditos',  this.token).subscribe(
      (data: any) => {
        this.creditosSubject.next(data);
      },
      (error) => { 
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los creditos en el formulario',
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los usuarios en el formulario',
        })
      }
    );
  }
}
