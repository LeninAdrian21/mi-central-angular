import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';
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
    dimension{
      nombre
    }
    lotes{
      codigo_interno
    }
    proveedor{
      nombre
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
    $limit: Int!,
    $nombre: String,
    $peso_neto: Float,
    $presentacion: String,
    $marca: String,
    $descripcion_generica: String,
    $precio: Float,
    $costo: Float,
    $inventario_disp: Long,
    $value_min: Int,
    $codigo_barras: Long,
    $codigoInterno: Long,
    $venta_gramos: Float,
    $status: Boolean,
    $status2: String,
    $dimension_nombre: String,
    $carritos_cantidad: Float,
    $promociones_fecha_creacion: DateTime,
    $lotes_codigo_interno: Long,
    $provedor_nombre:String
  ){
    paginationProduct(
      start: $start,
      limit: $limit,
      nombre: $nombre,
      peso_neto: $peso_neto,
      presentacion: $presentacion,
      marca: $marca,
      descripcion_generica: $descripcion_generica,
      precio: $precio,
      costo: $costo,
      inventario_disp: $inventario_disp,
      value_min: $value_min,
      codigo_barras: $codigo_barras,
      codigoInterno: $codigoInterno,
      venta_gramos: $venta_gramos,
      status: $status,
      status2: $status2,
      dimension_nombre: $dimension_nombre,
      carritos_cantidad: $carritos_cantidad,
      promociones_fecha_creacion: $promociones_fecha_creacion,
      lotes_codigo_interno: $lotes_codigo_interno,
      provedor_nombre:$provedor_nombre
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
          dimension {
            id
            nombre
          }
          proveedor {
            id
            nombre
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
        text: 'Error al mostrar los productos',
      })
    });
  }
  GetPaginator(
    start: number, // valor inicial de paginación
    limit:number, // número de elementos a mostrar en la página
    nombre?:string, // nombre del producto
    peso_neto?:any, // peso neto del producto
    presentacion?:string, // presentación del producto
    marca?:string, // marca del producto
    descripcion_generica?:string, // descripción genérica del producto
    precio?:any, // precio del producto
    costo?:any, // costo del producto
    inventario_disp?:number, // inventario disponible del producto
    value_min?:number, // valor mínimo del producto
    codigo_barras?:number, // código de barras del producto
    codigoInterno?:number, // código interno del producto
    venta_gramos?:any, // venta por gramos del producto
    status?:boolean, // estado del producto
    status2?:string, // otro estado del producto
    dimension_nombre?:string, // nombre de la dimensión del producto
    provedor_nombre?:string,
    carritos_cantidad?:any, // cantidad de productos en el carrito
    promociones_fecha_creacion?:string, // fecha de creación de la promoción del producto
    lotes_codigo_interno?:number // código interno del lote del producto
  ) {
    return this.apollo.watchQuery({
      query: Pagination,
      variables: {
        start,
        limit,
        nombre,
        peso_neto,
        presentacion,
        marca,
        descripcion_generica,
        precio,
        costo,
        inventario_disp,
        value_min,
        codigo_barras,
        codigoInterno,
        venta_gramos,
        status,
        status2,
        dimension_nombre,
        provedor_nombre,
        carritos_cantidad,
        promociones_fecha_creacion,
        lotes_codigo_interno,
      }
    })
    .valueChanges.pipe(
      map((result: any) => result.data.paginationProduct)
    );
  }
}
