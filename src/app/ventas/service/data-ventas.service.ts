import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  ventas{
    monto
    monto_total
    fecha
    status
    factura
    clasificacion
    fecha_entrega
    entrega_pendiente
    pagada
    local {
      nombre
    }
    usuario {
      nombre
    }
    carritos {
      cantidad
    }
    metodo_pagos {
      titular
    }
    rutas {
      destino
    }
    vendedores {
      nombre
    }
  }
}
`;
const Pagination = gql`
query paginationSale(
  $start: Int!,
  $limit: Int!,
  $amount: Float,
  $total_amount: Float,
  $date: DateTime,
  $clasification: String,
  $delivery_date: DateTime,
  $delivery_pending: Boolean,
  $paid: Boolean,
  $status: Boolean,
  $status2: String,
  $location_name: String,
  $user_name: String,
  $carts_quantity: Float,
  $payment_methods_owner: String,
  $destination_routes: String,
  $sellers_name: String
) {
  paginationSale(
    start: $start,
    limit: $limit,
    amount: $amount,
    total_amount: $total_amount,
    date: $date,
    clasification: $clasification,
    delivery_date: $delivery_date,
    delivery_pending: $delivery_pending,
    paid: $paid,
    status: $status,
    status2: $status2,
    location_name: $location_name,
    user_name: $user_name,
    carts_quantity: $carts_quantity,
    payment_methods_owner: $payment_methods_owner,
    destination_routes: $destination_routes,
    sellers_name: $sellers_name
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
        monto
        monto_total
        fecha
        factura
        clasificacion
        fecha_entrega
        entrega_pendiente
        pagada
        status
        status2
        local {
          id
          nombre
        }
        usuario {
          id
          nombre
        }
        carritos {
          id
          cantidad
        }
        metodo_pagos {
          id
          titular
        }
        rutas {
          id
          destino
        }
        vendedores {
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
export class DataVentasService {
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {ventas} = data;
      this.ventasSubject.next(ventas);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al cargar los datos ',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    amount?: number,
    total_amount?: number,
    date?: string,
    classification?: string,
    delivery_date?: string,
    delivery_pending?: boolean,
    paid?: boolean,
    status?: boolean,
    status2?: string,
    location_name?: string,
    user_name?: string,
    carts_quantity?: number,
    payment_methods_owner?: string,
    destination_routes?: string,
    sellers_name?: string
  ) {
    return this.apollo
      .watchQuery({
        query: Pagination,
        variables: {
          start,
          limit,
          amount,
          total_amount,
          date,
          classification,
          delivery_date,
          delivery_pending,
          paid,
          status,
          status2,
          location_name,
          user_name,
          carts_quantity,
          payment_methods_owner,
          destination_routes,
          sellers_name
        },
        context:{
          headers: this.headers
        }
      })
      .valueChanges.pipe(
        map((result: any) => result.data.paginationSale),
        catchError((error:any) => {
          console.error('Ocurrió un error:', error);
          Mensaje(error);
          return throwError(error);
          // Mensaje(errorMessage)
        })
      );
  }
}

