import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query {
  usuarios{
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
    referencia_direccion
    comment
    last_login
    status
    tipo_rol{
      rol
    }
    abonos{
      cantidad_abono
    }
    carritos{
      cantidad
    },
    compras{
      costo
    }
    creditos{
      limite
    }
    gastos{
      descripcion
    }
    historiales{
      fecha
    }
    locals{
      nombre
    }
    metodo_pagos{
      titular
    }
    ventas{
      monto
    }
    camiones{
      num_serie
    },
  }
}
`;
const Pagination = gql`
    query  paginationUser(
      $start: Int,
      $limit: Int,
      $name: String,
      $last_name: String,
      $mother_last_name: String,
      $birthdate: DateTime,
      $gender: String,
      $registration_date: DateTime,
      $enrollment_date: DateTime,
      $rfc: String,
      $curp: String,
      $nss: String,
      $phone: Long,
      $phone3: String,
      $email: String,
      $blood_type: String,
      $license: String,
      $allergies: String,
      $conditions: String,
      $nationality: String,
      $street: String,
      $number: Long,
      $neighborhood: String,
      $zip_code: Long,
      $municipality: String,
      $city: String,
      $country: String,
      $address_reference: String,
      $comment: String,
      $status: Boolean,
      $status2: String,
      $role_type: String,
      $payments_amount: Float,
      $carts_quantity: Float,
      $purchases_cost: Float,
      $credits_limit: Int,
      $expenses_description: String,
      $histories_date: DateTime,
      $locals_name: String,
      $payment_methods_holder: String,
      $sales_amount: Float,
      $trucks_serial_number: String,
    ) {
      paginationUser(
        start: $start,
        limit: $limit,
        name: $name,
        last_name: $last_name,
        mother_last_name: $mother_last_name,
        birthdate: $birthdate,
        gender: $gender,
        registration_date: $registration_date,
        enrollment_date: $enrollment_date,
        rfc: $rfc,
        curp: $curp,
        nss: $nss,
        phone: $phone,
        phone3: $phone3,
        email: $email,
        blood_type: $blood_type,
        license: $license,
        allergies: $allergies,
        conditions: $conditions,
        nationality: $nationality,
        street: $street,
        number: $number,
        neighborhood: $neighborhood,
        zip_code: $zip_code,
        municipality: $municipality,
        city: $city,
        country: $country,
        address_reference: $address_reference,
        comment: $comment,
        status: $status,
        status2: $status2,
        role_type: $role_type,
        payments_amount: $payments_amount,
        carts_quantity: $carts_quantity,
        purchases_cost: $purchases_cost,
        credits_limit: $credits_limit,
        expenses_description: $expenses_description,
        histories_date: $histories_date,
        locals_name: $locals_name,
        payment_methods_holder: $payment_methods_holder,
        sales_amount: $sales_amount,
        trucks_serial_number: $trucks_serial_number,
    ){
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
       edges {
        cursor
        node{
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
          tel_cel3
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
          referencia_direccion
          comment
          status
          status2
          tipo_rol{
            id
            rol
          }
          abonos{
            id
            cantidad_abono
          }
          carritos{
            id
            cantidad
          }
          compras{
            id
            costo
          }
          creditos{
            id
            limite
          }
          gastos{
            id
            descripcion
          }
          historiales{
            id
            fecha
          }
          locals{
            id
            nombre
          }
          metodo_pagos{
            id
            titular
          }
          ventas{
            id
            monto
          }
          camiones{
            id
            num_serie
          }
        }
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
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
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
        text: 'Error al cargar los datos',
      })
    });
  }
  GetPaginator(
    start: number,
    limit: number,
    name?: string,
    last_name?: string,
    mother_last_name?: string,
    birthdate?: string,
    gender?: string,
    registration_date?: string,
    enrollment_date?: string,
    rfc?: string,
    curp?: string,
    nss?: string,
    phone?: number,
    phone3?: string,
    email?: string,
    blood_type?: string,
    license?: string,
    allergies?: string,
    conditions?: string,
    nationality?: string,
    street?: string,
    number?: number,
    neighborhood?: string,
    zip_code?: number,
    municipality?: string,
    city?: string,
    country?: string,
    address_reference?: string,
    comment?: string,
    status?: boolean,
    status2?: string,
    role_type?: string,
    payments_amount?: number,
    carts_quantity?: number,
    purchases_cost?: number,
    credits_limit?: number,
    expenses_description?: string,
    histories_date?: string,
    locals_name?: string,
    payment_methods_holder?: string,
    sales_amount?: number,
    trucks_serial_number?: string
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables: {
        start,
        limit,
        name,
        last_name,
        mother_last_name,
        birthdate,
        gender,
        registration_date,
        enrollment_date,
        rfc,
        curp,
        nss,
        phone,
        phone3,
        email,
        blood_type,
        license,
        allergies,
        conditions,
        nationality,
        street,
        number,
        neighborhood,
        zip_code,
        municipality,
        city,
        country,
        address_reference,
        comment,
        status,
        status2,
        role_type,
        payments_amount,
        carts_quantity,
        purchases_cost,
        credits_limit,
        expenses_description,
        histories_date,
        locals_name,
        payment_methods_holder,
        sales_amount,
        trucks_serial_number
      },
      context:{
        headers: this.headers
      }
    }).valueChanges.pipe(
      map((result: any) => result.data.paginationUser),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    )
  }

}
