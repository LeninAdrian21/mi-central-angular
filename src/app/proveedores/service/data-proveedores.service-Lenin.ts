import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  proveedors{
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
      nombre
    }
    compras{
      id
      costo
    }
  }
}
`;
const Pagination = gql`
query PaginationProvider (
  $start: Int!,
  $limit: Int!,
  $name: String,
  $business_name: String,
  $rfc: String,
  $start_date: DateTime,
  $street: String,
  $number: String,
  $colony: String,
  $postal_code: Long,
  $municipality: String,
  $city: String,
  $country: String,
  $scheduled_visit: DateTime,
  $status: Boolean,
  $status2: String,
  $purchase_cost: Float,
  $product_name: String
){
  paginationProvider(
    start: $start,
    limit: $limit,
    name: $name,
    business_name: $business_name,
    rfc: $rfc,
    start_date: $start_date,
    street: $street,
    number: $number,
    colony: $colony,
    postal_code: $postal_code,
    municipality: $municipality,
    city: $city,
    country: $country,
    scheduled_visit: $scheduled_visit,
    status: $status,
    status2: $status2,
    purchase_cost: $purchase_cost,
    product_name: $product_name
  ){
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
        productos {
          id
          nombre
        }
        compras {
          id
          costo
        }
      }
    }
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class DataProveedoresService {
  private proveedoresSubject = new BehaviorSubject<any>([]);
  proveedores$ = this.proveedoresSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
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
        text: 'Error al cargar los datos',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    name?: string,
    business_name?: string,
    rfc?: string,
    start_date?: string,
    street?: string,
    number?: string,
    colony?: string,
    postal_code?: number,
    municipality?: string,
    city?: string,
    country?: string,
    scheduled_visit?: string,
    status?: boolean,
    status2?: string,
    purchase_cost?: any,
    product_name?: string
  ){
    return this.apollo.watchQuery<any>({
      query: Pagination,
      variables: {
        start,
        limit,
        name,
        business_name,
        rfc,
        start_date,
        street,
        number,
        colony,
        postal_code,
        municipality,
        city,
        country,
        scheduled_visit,
        status,
        status2,
        purchase_cost,
        product_name
      },
      context:{
        headers: this.headers
      }
    }).valueChanges.pipe(
      map((result:any) => result.data.paginationProvider),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
      })
    );
  }
}
