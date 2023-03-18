import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  usuarios{
    id
    nombre
    ap_paterno
    ap_materno
    fecha_nacimiento
    genero
    fecha_inscripcion
    fecha_alta
    rfc
    curp
    nss
    tel_cel
    email
    tipo_sangre
    licencia
    alergias
    padecimientos
    nacionalidad
    calle
    numero
    colonia
    cp
    municipio
    ciudad
    pais
    referencia_directa
    comment
    last_login
    status
    tipo_rol{
      id
    }
    locals{
      id
    }
    gastos{
      id
    }
    ventas{
      id
    }
    camiones{
      id
    },
    carritos{
      id
    },
    abonos{
      id
    }
    creditos{
      id
    }
    historiales{
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
export class DataUsuariosService {
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {usuarios} = data;
      this.usuariosSubject.next(usuarios);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar los usuarios',
      })
    });
  }
}
