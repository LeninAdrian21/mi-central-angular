import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
# Write your query or mutation here
query {
  locals{
    nombre
    alias
    razon_social
    rfc
    fecha_alta
    calle
    colonia
    numero_ext
    municipio
    numero_int
    ciudad
    cp
    latitud
    longitud
    telefono
    telefono_cel
    giro
    status
    ventas{
      monto
    }
    usuarios{
      nombre
    }
  }
}`
const Pagination = gql`
query paginationLocal(
  $start: Int,
  $limit: Int,
  $name: String,
  $alias: String,
  $social_reason: String,
  $rfc: String,
  $high_date: DateTime,
  $street: String,
  $cologne: String,
  $street_number: Long,
  $municipality: String,
  $internal_number: Long,
  $city: String,
  $cp: Long,
  $latitude: Float,
  $length: Float,
  $phone: Long,
  $cell_phone: Long,
  $turn: String,
  $status: Boolean,
  $status2: String,
  $user: String,
  $sales: Int
){
  paginationLocal(
  start:$start,
  limit:$limit,
  name:$name,
  alias:$alias,
  social_reason:$social_reason,
  rfc:$rfc,
  high_date:$high_date,
  street:$street,
  cologne:$cologne,
  street_number:$street_number,
  municipality:$municipality,
  internal_number:$internal_number,
  city:$city,
  cp:$cp,
  latitude:$latitude,
  length:$length,
  phone:$phone,
  cell_phone:$cell_phone,
  turn:$turn,
  status:$status,
  status2:$status2,
  user:$user,
  sales:$sales
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
				nombre
				alias
				razon_social
				rfc
				fecha_alta
				calle
				colonia
				numero_ext
				municipio
				numero_int
				ciudad
				cp
				latitud
				longitud
				telefono
				telefono_cel
				giro
				status
				status2
				cuentas
				usuarios{
          id
          nombre
        }
				ventas{
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
export class DataLocalesService {
  private localesSubject = new BehaviorSubject<any>([]);
  locales$ = this.localesSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {locals} = data;
      this.localesSubject.next(locals);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los locales',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    name?: string,
    alias?: string,
    social_reason?: string,
    rfc?: string,
    high_date?: string,
    street?: string,
    cologne?: string,
    street_number?: number,
    municipality?: string,
    internal_number?: number,
    city?: string,
    cp?: number,
    latitude?: any,
    length?: any,
    phone?: number,
    cell_phone?: number,
    turn?: string,
    status?: boolean,
    status2?: string,
    user?: string,
    sales?: number){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        name,
        alias,
        social_reason,
        rfc,
        high_date,
        street,
        cologne,
        street_number,
        municipality,
        internal_number,
        city,
        cp,
        latitude,
        length,
        phone,
        cell_phone,
        turn,
        status,
        status2,
        user,
        sales
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationLocal),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
