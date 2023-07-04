import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  rutas{
    descripcion
    lugar_origen
    destino
    fecha_salida
    fecha_llegada
    ruta_ciclica
    referencia
    nombre_mercancia_recibida
    comentarios
    estado
    ventas{
      monto
    }
    camiones{
      num_serie
    }
  }
}
`;


const Pagination = gql`
  query paginationRoute(
    $start: Int!,
    $limit: Int!,
    $description: String,
    $origin: String,
    $destination: String,
    $departure_date: DateTime,
    $arrival_date: DateTime,
    $reference: String,
    $received_goods_name: String,
    $comments: String,
    $state: String,
    $cyclic_route: Boolean,
    $trucks_serial_number: String,
    $sales_amount: Float
  ) {
    paginationRoute(
      start: $start,
      limit: $limit,
      description: $description,
      origin: $origin,
      destination: $destination,
      departure_date: $departure_date,
      arrival_date: $arrival_date,
      reference: $reference,
      received_goods_name: $received_goods_name,
      comments: $comments,
      state: $state,
      cyclic_route: $cyclic_route,
      trucks_serial_number: $trucks_serial_number,
      sales_amount: $sales_amount
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
          descripcion
          lugar_origen
          destino
          fecha_salida
          fecha_llegada
          referencia
          nombre_mercancia_recibida
          comentarios
          estado
          ruta_ciclica
          camiones {
            id
            num_serie
          }
          ventas {
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
export class DataRutasService {
  private rutasSubject = new BehaviorSubject<any>([]);
  rutas$ = this.rutasSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {rutas} = data;
      this.rutasSubject.next(rutas);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar las rutas',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    description?: string,
    origin?: string,
    destination?: string,
    departure_date?: string,
    arrival_date?: string,
    reference?: string,
    received_goods_name?: string,
    comments?: string,
    state?: string,
    cyclic_route?: boolean,
    trucks_serial_number?: string,
    sales_amount?: any
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables: {
        start,
        limit,
        description,
        origin,
        destination,
        departure_date,
        arrival_date,
        reference,
        received_goods_name,
        comments,
        state,
        cyclic_route,
        trucks_serial_number,
        sales_amount
      },
      context:{
        headers: this.headers
      }
    }).valueChanges.pipe(
      map((result: any) => result.data.paginationRoute),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
