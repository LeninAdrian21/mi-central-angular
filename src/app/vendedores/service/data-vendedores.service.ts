import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  vendedores{
    id
    nombre
    ventas{
      id
    }
  }
}
`;
const Pagination = gql`
query PaginationSeller(
  $start: Int!,
  $limit: Int!,
  $name: String,
  $salesAmount: Float) {
  paginationSeller(start: $start, limit: $limit, name: $name, sales_amount: $salesAmount) {
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
        nombre
        ventas {
          id
          monto
        }
      }
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class DataVendedoresService {
  private vendedoresSubject = new BehaviorSubject<any>([]);
  vendedores$ = this.vendedoresSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {vendedores} = data;
      this.vendedoresSubject.next(vendedores);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los vendedores',
      })
    });
  }
  GetPaginator(start: number, limit: number, name: string, salesAmount: number){
    return this.apollo.watchQuery({
      query: Pagination,
      variables: {
        start,
        limit,
        name,
        salesAmount
      }
    }).valueChanges.pipe(
      map((result: any) => result.data.paginationSeller)
    );
  }
}

