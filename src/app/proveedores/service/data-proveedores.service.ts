import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  proveedors{
    id
    nombre
    razon_social
    rfc
    fecha_alta
    calle
    numero
    colonia
    cp
    municipio
    ciudad
    pais
    visita_programada
    status
    productos{
      id
    }
    compras{
      id
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class DataProveedoresService {
  private proveedoresSubject = new BehaviorSubject<any>([]);
  proveedores$ = this.proveedoresSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {proveedors} = data;
      this.proveedoresSubject.next(proveedors);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los proveedores',
      })
    });
  }
}
