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
query paginationpayments(
  $start:Int,
  $limit:Int,
  $credit_quantity:Int,
  $credit_date:DateTime,
  $quantity_payment:String,
  $credit:Int,
  $user:String
  ){
    paginationpayments(
      start:$start,
      limit:$limit,
      credit_quantity:$credit_quantity,
      credit_date:$credit_date,
      quantity_payment:$quantity_payment,
      credit:$credit,
      user:$user
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
    credit_quantity?:number,
    credit_date?:string,
    quantity_payment?:string,
    credit?:number,
    user?:string){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        credit_quantity,
        credit_date,
        quantity_payment,
        credit,
        user
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationpayments),
      catchError((error:any) => {
        // Aquí puedes realizar el manejo del error y mostrar el mensaje al usuario
        console.error('Ocurrió un error:', error);
        // Puedes mostrar el mensaje al usuario de alguna manera, como mostrarlo en un componente o enviarlo a través de un Subject
        // Ejemplo: this.errorMessageSubject.next(errorMessage);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
