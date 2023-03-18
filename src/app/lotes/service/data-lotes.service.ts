import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  lotes{
    id
    codigo_interno
    fecha_arrivo
    fecha_caducidad
    fecha_adquisicion
    costo
    compras{
      id
      costo
    }
    products{
      id
      nombre
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class DataLotesService {
  private lotesSubject = new BehaviorSubject<any>([]);
  lotes$ = this.lotesSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {lotes} = data;
      this.lotesSubject.next(lotes);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los lotes',
      })
    });
  }
}
