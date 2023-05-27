import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  camiones{
    num_serie
    placas
    niv
    historial{
      fecha
    }
    gastos{
      categoria
    }
    rutas{
      destino
    }
    usuario{
      nombre
    }
  }
}
`;
const Pagination = gql`
 query paginationtrucks(
  $start: Int,
  $limit: Int,
  $plaque: String,
  $state: String,
  $plaque_active: Boolean,
  $num_serial: String,
  $record:DateTime,
  $niv: String,
  $destination: String,
  $driver: String,
  $spent: String,
 ){
  paginationtrucks(
  start: $start,
  limit: $limit,
  plaque: $plaque,
  state: $state,
  plaque_active: $plaque_active,
  num_serial: $num_serial,
  record:$record,
  niv: $niv,
  destination: $destination,
  driver: $driver,
  spent: $spent,
 )
 {
  totalCount
  pageInfo{
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
  edges{
    node{
      placas
      num_serie
      niv
      historial{
        id
        fecha
      }
      usuario{
        id
        nombre
      }
      rutas{
        destino
        id
      }
      gastos{
        id
        categoria
      }
    }
  }
}
}`
@Injectable({
  providedIn: 'root'
})
export class DataCamionesService {
  private camionesSubject = new BehaviorSubject<any>([]);
  camiones$ = this.camionesSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {camiones} = data;
      this.camionesSubject.next(camiones);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los camiones',
      })
    }
    );
  }
  GetPaginator(
    start:number,
    limit: number,
    plaque?: string,
    state?: string,
    plaque_active?: boolean,
    num_serial?: string,
    record?:string,
    niv?: string,
    destination?: string,
    driver?: string,
    spent?: string,){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        plaque,
        state,
        plaque_active,
        num_serial,
        record,
        niv,
        destination,
        driver,
        spent,
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationtrucks)
    );
  }   
}
