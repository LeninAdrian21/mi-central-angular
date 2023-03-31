import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
import Swal from 'sweetalert2';

const QUERY = gql`
query {
  abonos(where:{
    mostrar:true
  }){
    id
    cantidad_abono
    fecha_abono
    estado_abono
    credito{
      id
      limite
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
query paginationAbonos($start:Int, $limit:Int){
  paginationAbonos(start:$start, limit:$limit) {
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
          limite
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

  constructor(private apollo: Apollo) {
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
  GetPaginator(start?: number, limit?:number){
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationAbonos)
    );
  }
}
