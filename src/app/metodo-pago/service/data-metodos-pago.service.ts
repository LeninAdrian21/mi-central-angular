import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
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
    $start: Int,
    $limit: Int,

  ) {
    paginationPaymentMethod(
      start: $start,
      limit: $limit,

    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
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
          compras {
            id
            costo
          }
          creditos {
            id
            limite
          }
          usuario {
            id
            nombre
          }
          venta {
            id
            monto
          }
        }
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
    // card_number?: string,
    // month?: string,
    // year?: string,
    // cvc?: number,
    // holder?: string,
    // invoice?: number,
    // expedition_date?: string,
    // admission_date?: string,
    // description?: string,
    // reference?: string,
    // type?: string,
    // shopping_cost?: number,
    // credits_limit?: number,
    // username?: string,
    // sale_amount?: number
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables: {
        start,
        limit,
        // card_number,
        // month,
        // year,
        // cvc,
        // holder,
        // invoice,
        // expedition_date,
        // admission_date,
        // description,
        // reference,
        // type,
        // shopping_cost,
        // credits_limit,
        // username,
        // sale_amount
      },
    }).valueChanges.pipe(
      map((result: any) => result.data.paginationPaymentMethod)
    );
  }
}
