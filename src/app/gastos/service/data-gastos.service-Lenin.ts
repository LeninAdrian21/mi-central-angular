import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  gastos{
    descripcion
    fecha
    monto
    categoria
    status
    usuario{
      nombre
    }
    camions{
      num_serie
    }
  }
}
`;
const Pagination = gql`
  query paginationspents(
    $start: Int,
    $limit: Int,
    $description: String,
    $date: DateTime,
    $amount: Float,
    $categoria: String,
    $status: Boolean,
    $user: String,
    $trucks : String
  ){
    paginationspents(
      start:$start,
      limit:$limit,
      description:$description,
      date:$date,
      amount:$amount,
      categoria:$categoria,
      status:$status,
      user:$user,
      trucks:$trucks,
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
           descripcion
           fecha
           monto
           categoria
           status
           usuario{
            id
            nombre
          }
           camions{
            id
            num_serie
          }
        }
      }
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class DataGastosService {
  private gastosSubject = new BehaviorSubject<any>([]);
  gastos$ = this.gastosSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {gastos} = data;
      this.gastosSubject.next(gastos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los gastos',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    description?: string,
    date?: string,
    amount?: any,
    categoria?: string,
    status?: boolean,
    user?: string,
    trucks ?: string){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        description,
        date,
        amount,
        categoria,
        status,
        user,
        trucks
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationspents),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
