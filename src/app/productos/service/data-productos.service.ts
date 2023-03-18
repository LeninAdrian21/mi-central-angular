import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  productos{
    id
    nombre
    peso_neto
    presentacion
    marca
    descripcion_generica
    precio
    costo
    inventario_disp
    value_min
    codigo_barras
    codigo_interno
    venta_gramos
    status
    dimension{
      id
    }
    lotes{
      id
    }
    proveedor{
      id
    },
    carritos{
      id
    }
    promociones{
      id
    }
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class DataProductosService {
  private productosSubject = new BehaviorSubject<any>([]);
  productos$ = this.productosSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {productos} = data;
      this.productosSubject.next(productos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los productos',
      })
    });
  }
}
