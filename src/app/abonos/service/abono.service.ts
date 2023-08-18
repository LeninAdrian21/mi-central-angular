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
  constructor(private service: CrudService) {
    this.Creditos();
    this.Usuarios();
  }
  Creditos(){
    this.service.get('creditos',  localStorage.getItem('token')!).subscribe(
      (data: any) => {
        this.creditosSubject.next(data);
      },
      (error) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los creditos en el formulario',
        })
      }
    );
  }
  Usuarios(){
    this.service.get('usuarios', localStorage.getItem('token')!).subscribe(
      (data: any) => {
        this.usuariosSubject.next(data);
      },
      (error) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los usuarios en el formulario',
        })
      }
    );
  }
}
