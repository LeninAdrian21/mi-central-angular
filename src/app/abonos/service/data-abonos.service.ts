import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

const QUERY = gql`
query {
  abonos(where:{
    mostrar:true
  }){
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
}
