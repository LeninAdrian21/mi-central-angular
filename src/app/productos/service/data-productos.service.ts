import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Mensaje } from 'src/functions/functions';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  productos{
		nombre
		peso_neto
		presentacion
		marca
		descripcion_generica
		precio
		costo
		inventario_disp
		value_min
		codigo_barras
		codigo_interno
		venta_gramos
		status
		status2
		dimension{
      nombre
    }
		proveedor{
      nombre
    }
		carritos{
      cantidad
    }
		promociones{
      fecha_creacion
    }
		lotes{
      codigo_interno
    }
  }
}
`;
const Pagination = gql`
  query paginationProduct(
    $start: Int,
    $limit: Int,
    $name: String,
    $net_weight: Float,
    $presentation: String,
    $brand: String,
    $generic_description: String,
    $price: Float,
    $cost: Float,
    $available_inventory: Long,
    $value_min: Int,
    $barcode: Long,
    $internal_code: Long,
    $sale_grams: Float,
    $status: Boolean,
    $status2: String,
    $size_name: String,
    $carts_quantity: Float,
    $promotions_date_creation:DateTime,
    $batches_internal_code:Long,
    $provider_name:String
  ){
    paginationProduct(
      start:$start,
      limit:$limit,
      name:$name,
      net_weight:$net_weight,
      presentation:$presentation,
      brand:$brand,
      generic_description:$generic_description,
      price:$price,
      cost:$cost,
      available_inventory:$available_inventory,
      value_min: $value_min,
      barcode: $barcode,
      internal_code:$internal_code,
      sale_grams:$sale_grams,
      status:$status,
      status2:$status2,
      size_name:$size_name,
      carts_quantity:$carts_quantity,
      promotions_date_creation:$promotions_date_creation,
      batches_internal_code:$batches_internal_code,
      provider_name:$provider_name
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
          peso_neto
          presentacion
          marca
          descripcion_generica
          precio
          costo
          inventario_disp
          value_min
          codigo_barras
          codigo_interno
          venta_gramos
          status
          status2
          dimension{
            id
            nombre
          }
          proveedor{
            id
            nombre
          }
          carritos{
            id
            cantidad
          }
          promociones{
            id
            fecha_creacion
          }
          lotes{
            id
            codigo_interno
          }
        }
      }
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class DataProductosService {
  private productosSubject = new BehaviorSubject<any>([]);
  productos$ = this.productosSubject.asObservable();
  headers = new HttpHeaders().set( 'authorization','Bearer ' + localStorage.getItem('token'));
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {productos} = data;
      this.productosSubject.next(productos);
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
    name?: string,
    net_weight?:any,
    presentation?: string,
    brand?: string,
    generic_description?: String,
    price?: any,
    cost?: any,
    available_inventory?: number,
    value_min?: number,
    barcode?: number,
    internal_code?: number,
    sale_grams?: any,
    status?: any,
    status2?: string,
    size_name?: string,
    carts_quantity?: any,
    promotions_date_creation?:any,
    batches_internal_code?:number,
    provider_name?:string
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables:{
        start,
        limit,
        name,
        net_weight,
        presentation,
        brand,
        generic_description,
        price,
        cost,
        available_inventory,
        value_min,
        barcode,
        internal_code,
        sale_grams,
        status,
        status2,
        size_name,
        carts_quantity,
        promotions_date_creation,
        batches_internal_code,
        provider_name
      },
      context:{
        headers: this.headers
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationProduct),
      catchError((error:any) => {
        console.error('Ocurrió un error:', error);
        Mensaje(error);
        return throwError(error);
        // Mensaje(errorMessage)
      })
    );
  }
}
