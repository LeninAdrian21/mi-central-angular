import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  dimensiones{
    nombre
    ancho
    alto
    largo
    productos{
      nombre
    }
  }
}
`;
const Pagination = gql`
query paginationDimensions(
  $start: Int,
  $limit: Int,
  $name : String,
  $width: Float,
  $high: Float,
  $long: Float,
  $products: String
){
  paginationDimensions(
  start:$start,
  limit:$limit,
  name:$name,
  width:$width,
  high:$high,
  long:$long,
  products:$products
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
				ancho
				alto
				largo
				productos{
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
export class DataDimensionesService {
  private dimensionesSubject = new BehaviorSubject<any>([]);
  dimensiones$ = this.dimensionesSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo:Apollo) {
    this.GetData();
  }
  GetData(){
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {dimensiones} = data;
      this.dimensionesSubject.next(dimensiones);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar las dimensiones',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    name ?: string,
    width?: any,
    high?: any,
    long?: any,
    products?: string ){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        name,
        width,
        high,
        long,
        products
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationDimensions),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
