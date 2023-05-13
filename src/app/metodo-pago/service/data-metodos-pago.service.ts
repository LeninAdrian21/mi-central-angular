import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  metodoPagos{
    numero_tarjeta
    mes
    anio
    cvc
    titular
    folio
    fecha_expedicion
    fecha_ingreso
    descripcion
    referencia
    tipo
    usuario{
      id
    }
    venta{
      id
    }
    compras{
      id
    }
    creditos{
      id
    }
  }
}
`;
const Pagination = gql`
 query paginationPaymentMethod(
  $start:Int,
  $limit:Int,
 ){
  paginationPaymentMethod(
    start:$start,
    limit:$limit
  ){
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
 }
`;
@Injectable({
  providedIn: 'root'
})
export class DataMetodosPagoService {
  private metodoPagoSubject = new BehaviorSubject<any>([]);
  metodosPago$ = this.metodoPagoSubject.asObservable();
  constructor(private apollo:Apollo) {
    this.GetData();

  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {metodoPagos} = data;
      this.metodoPagoSubject.next(metodoPagos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los metodos de pago',
      })
    });
  }

  GetPaginator(
    start: number,
    limit: number,
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        // credit_quantity,
        // credit_date,
        // quantity_payment,
        // credit,
        // user
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationpayments)
    );
  }
}
