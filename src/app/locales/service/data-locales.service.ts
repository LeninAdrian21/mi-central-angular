import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
# Write your query or mutation here
query {
  locals{
    id
    nombre
    alias
    razon_social
    rfc
    fecha_alta
    calle
    colonia
    numero_ext
    municipio
    numero_int
    ciudad
    cp
    latitud
    longitud
    telefono
    telefono_cel
    giro
    status
    ventas{
      id
    }
    usuarios{
      id
    }
  }
}`
@Injectable({
  providedIn: 'root'
})
export class DataLocalesService {
  private localesSubject = new BehaviorSubject<any>([]);
  locales$ = this.localesSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {locals} = data;
      this.localesSubject.next(locals);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los locales',
      })
    });
  }
}
