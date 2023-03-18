import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosSubject = new BehaviorSubject<any>([]);
  productos$ = this.productosSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  token: any = localStorage.getItem('token');
  constructor(private service: CrudService) {
    this.productos();
    this.usuarios();
    this.ventas();
  }
  productos(){
    this.service.get('productos',  this.token).subscribe(
      (data: any) => {
        this.productosSubject.next(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los productos en el formulario',
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar los usuarios en el formulario',
        })
      }
    );
  }
  ventas(){
    this.service.get('ventas',this.token).subscribe(
      (data:any)=>{
        this.ventasSubject.next(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a mostrar las ventas en el formulario',
        })
      }
    )
  }
}
