import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  compras{
    id
    costo
    fecha_pedido
    referencia
    fecha_llegada
    status
    metodo_pago{
      id
    }
    lote{
      id
    }
    proveedor{
      id
    }
    usuarios{
      id
    }
  }
}`;
@Injectable({
  providedIn: 'root'
})
export class DataComprasService {
  private comprasSubject = new BehaviorSubject<any>([]);
  compras$ = this.comprasSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData(){
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {compras} = data;
      this.comprasSubject.next(compras);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error a mostrar las compras',
      })
    });
  }
}
