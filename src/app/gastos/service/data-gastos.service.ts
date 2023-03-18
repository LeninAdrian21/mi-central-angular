import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  gastos{
    id
    descripcion
    fecha
    monto
    categoria
    status
    usuario{
      id
    }
    camions{
      id
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class DataGastosService {
  private gastosSubject = new BehaviorSubject<any>([]);
  gastos$ = this.gastosSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {gastos} = data;
      this.gastosSubject.next(gastos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los gastos',
      })
    });
  }
}
