import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  promociones{
    id
    fecha_creacion
    fecha_vigencia
    valor_descuento
    codigo_ref
    condicion
    productos{
      id
      nombre
    }
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class DataPromocionesService {
  private promocionesSubject = new BehaviorSubject<any>([]);
  promociones$ = this.promocionesSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {promociones} = data;
      this.promocionesSubject.next(promociones);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los promociones',
      })
    });
  }
}
