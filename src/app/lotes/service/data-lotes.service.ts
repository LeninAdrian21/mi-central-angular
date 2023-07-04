import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  lotes{
    codigo_interno
    fecha_arrivo
    fecha_caducidad
    fecha_adquisicion
    costo
    compras{
      costo
    }
    products{
      nombre
    }
  }
}
`;
const Pagination = gql`
  query paginationLot(
    $start: Int,
    $limit: Int,
    $internal_code: Int,
    $arrival_date: DateTime,
    $expiration_date: DateTime,
    $acquisition_date: DateTime,
    $cost: Float,
    $shopping_cost:Int,
    $product_name:String
  ){
    paginationLot(
      start:$start,
      limit:$limit,
      internal_code:$internal_code,
      arrival_date:$arrival_date,
      expiration_date:$expiration_date,
      acquisition_date:$acquisition_date,
      cost:$cost,
      shopping_cost:$shopping_cost,
      product_name:$product_name
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
          codigo_interno
          fecha_arrivo
          fecha_caducidad
          fecha_adquisicion
          costo
          compras{
            id
            costo
          }
          products{
            id
            nombre
          }
        }
      }
    }
  }
`
@Injectable({
  providedIn: 'root'
})
export class DataLotesService {
  private lotesSubject = new BehaviorSubject<any>([]);
  lotes$ = this.lotesSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {lotes} = data;
      this.lotesSubject.next(lotes);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al cargar datos',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    internal_code?: number,
    arrival_date?: string,
    expiration_date?: string,
    acquisition_date?: string,
    cost?: any,
    shopping_cost?:number,
    product_name?:string
  ){
    return this.apollo.watchQuery({
        query: Pagination,
        variables:{
          start,
          limit,
          internal_code,
          arrival_date,
          expiration_date,
          acquisition_date,
          cost,
          shopping_cost,
          product_name
        },context:{
          headers: this.headers
        }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationLot),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    )
  }
}
