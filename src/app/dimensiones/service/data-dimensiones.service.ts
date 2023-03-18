import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  dimensiones{
    id
    nombre
    ancho
    alto
    largo
    productos{
      id
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class DataDimensionesService {
  private dimensionesSubject = new BehaviorSubject<any>([]);
  dimensiones$ = this.dimensionesSubject.asObservable();
  constructor(private apollo:Apollo) {
    this.GetData();
  }
  GetData(){
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {dimensiones} = data;
      this.dimensionesSubject.next(dimensiones);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar las dimensiones',
      })
    });
  }
}
