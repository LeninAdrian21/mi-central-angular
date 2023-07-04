import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  metodoPagos{
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
    usuario {
      nombre
    }
    venta {
      monto
    }
    creditos {
      limite
    }
    compras {
      costo
    }
  }
}
`;
const Pagination = gql`
 query paginationPaymentMethod(
  $start:Int,
  $limit:Int,
  $card_number:Long,
  $month: String,
  $year:Long,
  $cvc:Int,
  $holder:String,
  $invoice:Long,
  $expedition_date:DateTime,
  $admission_date:DateTime,
  $description:String,
  $reference:String,
  $type:String,
  $shopping_cost:Float,
  $credits_limit:Long,
  $username:String,
  $sale_amount:Float
 ){
  paginationPaymentMethod(
    start: $start,
    limit: $limit,
    card_number: $card_number,
    month: $month,
    year: $year,
    cvc: $cvc,
    holder: $holder,
    invoice: $invoice,
    expedition_date: $expedition_date,
    admission_date: $admission_date,
    description: $description,
    reference: $reference,
    type: $type,
    shopping_cost: $shopping_cost,
    credits_limit: $credits_limit,
    username: $username,
    sale_amount: $sale_amount
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
      node {
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
        compras {
          id
          costo
        }
        creditos {
          id
          limite
        }
        usuario {
          id
          nombre
        }
        venta {
          id
          monto
        }
      }
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
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
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
        text: 'Error al cargar los datos',
      })
    });
  }

  GetPaginator(
    start:number,
    limit:number,
    card_number?:number,
    month?: string,
    year?:number,
    cvc?:number,
    holder?:string,
    invoice?:number,
    expedition_date?:any,
    admission_date?:any,
    description?:string,
    reference?:string,
    type?:string,
    shopping_cost?:any,
    credits_limit?:number,
    username?:string,
    sale_amount?:any
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        card_number,
        month,
        year,
        cvc,
        holder,
        invoice,
        expedition_date,
        admission_date,
        description,
        reference,
        type,
        shopping_cost,
        credits_limit,
        username,
        sale_amount
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationPaymentMethod),
      catchError((error: any) => {
        console.error('Error occurred:', error);
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al mostrar los metodos de pago',
        })
    })
    );
  }
}
