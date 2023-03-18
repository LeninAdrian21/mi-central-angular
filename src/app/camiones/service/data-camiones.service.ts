import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  camiones{
    id
    num_serie
    placas
    niv
    historial{
      id
      fecha
    }
    gastos{
      id
      descripcion
    }
    rutas{
      id
      descripcion
    }
    usuario{
      nombre
      ap_paterno
      ap_materno
    }
  }
}
`;
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
}
