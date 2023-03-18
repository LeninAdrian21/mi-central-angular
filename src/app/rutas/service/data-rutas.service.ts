import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  rutas{
    id
    descripcion
    lugar_origen
    destino
    fecha_salida
    fecha_llegada
    ruta_ciclica
    referencia
    nombre_mercancia_recibida
    comentarios
    estado
    ventas{
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
export class DataRutasService {
  private rutasSubject = new BehaviorSubject<any>([]);
  rutas$ = this.rutasSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {rutas} = data;
      this.rutasSubject.next(rutas);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar las rutas',
      })
    });
  }
}
