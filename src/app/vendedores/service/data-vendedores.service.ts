import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
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
}
