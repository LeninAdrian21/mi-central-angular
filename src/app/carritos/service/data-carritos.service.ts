import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  carritos{
    cantidad
    usuario{
      nombre
    }
    productos{
      nombre
    }
    venta{
      monto
    }
  }
}
`;
const Pagination = gql`
query paginationcarts(
  $start:Int,
  $limit:Int,
  $amount: Int,
  $products: String,
  $user: String,
  $sale: Float
){
  paginationcarts(
  start:$start,
  limit:$limit,
  amount:$amount,
  products:$products,
  user:$user,
  sale:$sale
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
				cantidad
				usuario{
          id
          nombre
        }
				venta{
          id
          monto
        }
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
export class DataCarritosService {
  private carritosSubject = new BehaviorSubject<any>([]);
  carritos$ =  this.carritosSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {carritos} = data;
      console.log(carritos);

      this.carritosSubject.next(carritos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar el carrito',
      })
    }
    );
  }
  GetPaginator(
    start: number,
    limit:number,
    amount?:number,
    products?: string,
    user?: string,
    sale?:any){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        amount,
        products,
        user,
        sale
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationcarts),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
