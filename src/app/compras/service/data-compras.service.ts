import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  compras{
    costo
    fecha_pedido
    referencia
    fecha_llegada
    status
    status2
    metodo_pago{
      numero_tarjeta
    }
    lote{
      codigo_interno
    }
    proveedor{
      nombre
    }
    usuarios{
      nombre
    }
  }
}`;
const Pagination = gql`
  query paginationshopping(
    $start: Int,
    $limit: Int,
    $cost: Float,
    $order_date: DateTime,
    $reference: String,
    $arrival_date: DateTime,
    $status: Boolean,
    $status2: String,
    $lot: Int,
    $payment_method: Int,
    $provider: String,
    $user: String
  ){
    paginationshopping(
      start:$start,
      limit:$limit,
      cost:$cost,
      order_date:$order_date,
      reference:$reference,
      arrival_date:$arrival_date,
      status:$status,
      status2:$status2,
      lot:$lot,
      payment_method:$payment_method,
      provider:$provider,
      user:$user
    ){
      totalCount
      pageInfo{
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges{
        node{
          costo
          fecha_pedido
          referencia
          fecha_llegada
          status
          status2
          lote{
            id
            codigo_interno
          }
          metodo_pago{
            id
            numero_tarjeta
          }
          proveedor{
            id
            nombre
          }
          usuarios{
            id
            nombre
          }
        }
      }
    }
  }
`;
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
  GetPaginator(
    start:number,
    limit:number,
    cost?: any,
    order_date?:string,
    reference?:string,
    arrival_date?:string,
    status?:boolean,
    status2?:string,
    lot?:number,
    payment_method?:number,
    provider?:string,
    user?:string
  ){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        cost,
        order_date,
        reference,
        arrival_date,
        status,
        status2,
        lot,
        payment_method,
        provider,
        user
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationshopping)
    );
  }
}
