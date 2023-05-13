import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  productos{
    name
    net_weight
    presentation
    brand
    generic_description
    price
    cost
    available_inventory
    value_min
    barcode
    codigo_interno
    sale_grams
    status
    dimension{
      name
    }
    lotes{
      codigo_interno
    }
    proveedor{
      name
    },
    carritos{
      cantidad
    }
    promociones{
      fecha_creacion
    }
  }
}
`;
const Pagination= gql`
  query paginationProduct(
    $start: Int!,
    $limit: Int!
  ){
    paginationProduct(
      start: $start,
      limit: $limit,
    ) {
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
          name
          net_weight
          presentation
          brand
          generic_description
          price
          cost
          available_inventory
          value_min
          barcode
          codigo_interno
          sale_grams
          status
          status2
          dimension {
            id
            name
          }
          proveedor {
            id
            name
          }
          carritos {
            id
            cantidad
          }
          promociones {
            id
            fecha_creacion
          }
          lotes {
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
        text: 'Error',
      })
    });
  }
  GetPaginator(
    start: number, // valor inicial de paginación
    limit:number, // número de elementos a mostrar en la página
    // name?:string, // name del producto
    // net_weight?:any, // peso neto del producto
    // presentation?:string, // presentación del producto
    // brand?:string, // brand del producto
    // generic_description?:string, // descripción genérica del producto
    // price?:any, // price del producto
    // cost?:any, // cost del producto
    // available_inventory?:number, // inventario disponible del producto
    // value_min?:number, // valor mínimo del producto
    // barcode?:number, // código de barras del producto
    // internal_code?:number, // código interno del producto
    // sale_grams?:any, // venta por gramos del producto
    // status?:boolean, // estado del producto
    // status2?:string, // otro estado del producto
    // size_name?:string, // name de la dimensión del producto
    // provider_name?:string,
    // carts_quantity?:any, // cantidad de productos en el carrito
    // promotions_date_creation?:string, // fecha de creación de la promoción del producto
    // batches_internal_code?:number // código interno del lote del producto
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables: {
        start,
        limit,
        // name,
        // net_weight,
        // presentation,
        // brand,
        // generic_description,
        // price,
        // cost,
        // available_inventory,
        // value_min,
        // barcode,
        // internal_code,
        // sale_grams,
        // status,
        // status2,
        // size_name,
        // provider_name,
        // carts_quantity,
        // promotions_date_creation,
        // batches_internal_code,
      }
    })
    .valueChanges.pipe(
      map((result: any) => {result.data.paginationProduct},
      (error:any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al mostar los productos',
        })
      })
    )
  }
}
