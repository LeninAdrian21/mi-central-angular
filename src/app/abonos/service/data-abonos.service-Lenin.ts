import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mensaje } from 'src/functions/functions';

const QUERY = gql`
query {
  abonos(where:{
    mostrar:true
  }){
    cantidad_abono
    fecha_abono
    estado_abono
    credito{
      intereses
    }
    usuario{
      nombre
    }
  }
}
`
const Pagination = gql`
query paginationDataPayment($start: Int, $limit: Int, $filters: [FilterPaymentField])  {
    paginationDataPayment(
      start:$start,
      limit:$limit,
      filters:$filters
    ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        cantidad_abono
        fecha_abono
        estado_abono
        credito{
          id
          intereses
        }
        usuario{
          id
          nombre
          ap_paterno
          ap_materno
        }
      }
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class DataAbonosService {
  private abonosSubject = new BehaviorSubject<any>([]);
  abonos$ = this.abonosSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY,
    }).valueChanges.subscribe(({ data }) => {
      const {abonos} = data;
      this.abonosSubject.next(abonos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los abonos',
      })
    });
  }
  GetPaginator(
    start: number,
    limit:number,
    filters?:any,
    ){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        filters
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationDataPayment),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error.message);
        Mensaje(error);
        return throwError(error);
      })
    );
  }
}
