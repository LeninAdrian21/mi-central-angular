import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  metodoPagos{
    id
    numero_tarjeta
    mes
    anio
    cvc
    titular
    folio
    fecha_expedicion
    fecha_ingreso
    descripcion
    referencia
    tipo
    usuario{
      id
    }
    venta{
      id
    }
    compras{
      id
    }
    creditos{
      id
    }
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class DataMetodosPagoService {
  private metodoPagoSubject = new BehaviorSubject<any>([]);
  metodosPago$ = this.metodoPagoSubject.asObservable();
  constructor(private apollo:Apollo) {
    this.GetData();

  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {metodoPagos} = data;
      this.metodoPagoSubject.next(metodoPagos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los metodos de pago',
      })
    });
  }
}
