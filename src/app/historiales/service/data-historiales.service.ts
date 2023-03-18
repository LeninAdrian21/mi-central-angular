import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  historials{
    id
    fecha
    status
    hora_inicio
    hora_fin
    usuario{
      id
    }
    camiones{
      id
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
}
