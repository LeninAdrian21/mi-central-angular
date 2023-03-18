import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  ventas{
    id
    monto
    monto_total
    fecha
    status
    factura
    clasificacion
    fecha_entrega
    entrega_pendiente
    pagada
    usuario{
      id
    }
    local{
      id
    }
    rutas{
      id
    }
    vendedores{
      id
    }
    carritos{
      id
    }
    metodo_pagos{
      id
    }
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class DataVentasService {
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {ventas} = data;
      this.ventasSubject.next(ventas);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar las ventas',
      })
    });
  }
}
