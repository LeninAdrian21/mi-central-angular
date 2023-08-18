import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';

const QUERY = gql`
query {
  creditos(where:{
    mostrar:true
  }){
    limite
    fecha_alta
    fecha_baja
    vigencia
    intereses
    status
    usuario{
      nombre
    }
    metodo_pago{
      numero_tarjeta
    }
    abonos{
      cantidad_abono
    }
  }
}
`;
const Pagination = gql`
  query paginationcredit(
    $start:Int,
    $limit:Int,
    $end: Float,
    $high_date: DateTime,
    $low_date: DateTime,
    $validity: DateTime,
    $interests: Float,
    $status: Boolean,
    $status2: String,
    $payments: Float,
    $payment_method: Float,
    $user: String
  ){
    paginationcredit(
      start:$start,
      limit:$limit,
      end:$end,
      high_date:$high_date,
      low_date:$low_date,
      validity:$validity,
      interests:$interests,
      status:$status,
      status2:$status2,
      payments:$payments,
      payment_method:$payment_method,
      user:$user,
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
            limite
            fecha_alta
            fecha_baja
            vigencia
            intereses
            status
            status2
            metodo_pago{
              id
              numero_tarjeta
            }
            usuario{
              id
              nombre
            }
            abonos{
              id
              cantidad_abono
            }
          }
        }
      }
  }

`

@Injectable({
  providedIn: 'root'
})
export class DataCreditosService {
  private creditosSubject = new BehaviorSubject<any>([]);
  creditos$ = this.creditosSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor( private apollo: Apollo) {
    this.GetData();
  }
  GetData(){
    this.apollo.watchQuery<any>({
      query:QUERY
    }).valueChanges.subscribe(
      ({data})=>{
        const {creditos} = data;
        this.creditosSubject.next(creditos);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al mostrar los creditos',
        })
      });
  }
  GetPaginator(
    start:number,
    limit:number,
    end?: any,
    high_date?: string,
    low_date?: string,
    validity?: string,
    interests?: any,
    status?: boolean,
    statud2?: string,
    payments?: any,
    payment_method?: any,
    user?: string
  ){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        end,
        high_date,
        low_date,
        validity,
        interests,
        status,
        statud2,
        payments,
        payment_method,
        user,
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result:any) => result.data.paginationcredit),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
