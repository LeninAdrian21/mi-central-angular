import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  historials{
    fecha
    status
    hora_inicio
    hora_fin
    usuario{
      nombre
    }
    camiones{
      num_serie
    }
  }
}
`;
const Pagination = gql`
  query  paginationrecords(
    $start: Int,
    $limit: Int,
    $date: DateTime,
    $start_time: Time,
    $end_time: Time,
    $status: Boolean,
    $status2: String,
    $trucks: String,
    $user: String
  ){
    paginationrecords(
      start:$start,
      limit:$limit,
      date:$date,
      start_time:$start_time,
      end_time:$end_time,
      status:$status,
      status2:$status2,
      trucks:$trucks,
      user:$user
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
   
          fecha
          hora_inicio
          hora_fin
          status
          status2
          usuario{
            id
            nombre
          }
          camiones{
            id
            num_serie
          }
        }
      }
    }
  }
`
@Injectable({
  providedIn: 'root'
})
export class DataHistorialesService {
  private historialesSubject = new BehaviorSubject<any>([]);
  historiales$ = this.historialesSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {historials} = data;
      this.historialesSubject.next(historials);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los historiales',
      })
    }
    );
  }
  GetPaginator(
    start: number,
    limit: number,
    date?: string,
    start_time?: string,
    end_time?: string,
    status?: boolean,
    status2?: string,
    trucks?: string,
    user?: string){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        date,
        start_time,
        end_time,
        status,
        status2,
        trucks,
        user
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationrecords)
    );
  }
}
