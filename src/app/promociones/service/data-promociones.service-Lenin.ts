import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  promociones{
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
const Pagination= gql`
  query paginationPromotion(
    $start: Int!,
    $limit: Int!,
    $creation_date: DateTime,
    $validity_date: DateTime,
    $discount_value: Float,
    $ref_code: Long,
    $condition: String,
    $product_name: String
  ) {
    paginationPromotion(
      start: $start,
      limit: $limit,
      creation_date: $creation_date,
      validity_date: $validity_date,
      discount_value: $discount_value,
      ref_code: $ref_code,
      condition: $condition,
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
        node{
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
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class DataPromocionesService {
  private promocionesSubject = new BehaviorSubject<any>([]);
  promociones$ = this.promocionesSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
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
        text: 'Error al cargar los datos',
      })
    });
  }
  GetPaginator(
    start: number,
    limit:number,
    creation_date?: string,
    validity_date?: string,
    discount_value?: any,
    ref_code?: number,
    condition?: string,
    product_name?: string
  ){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        creation_date,
        validity_date,
        discount_value,
        ref_code,
        condition,
        product_name
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationPromotion),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
