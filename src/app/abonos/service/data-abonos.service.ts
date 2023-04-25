import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const QUERY = gql`
query {
  abonos(where:{
    mostrar:true
  }){
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
`
const Pagination = gql`
query paginationpayments(
  $start:Int,
  $limit:Int,
  $credit_quantity:Int,
  $credit_date:DateTime,
  $quantity_payment:String,
  $credit:Float,
  $user:String){
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

  constructor(private apollo: Apollo, private http:HttpClient) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
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
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationpayments)
    );
  }
}
