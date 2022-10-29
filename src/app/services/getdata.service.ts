import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

const QUERY = gql`
query {
  abonos(where:{
    mostrar:true
  }){
    id
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
  camiones{
    id
    num_serie
    placas
    niv
    historial{
      id
    }
    gastos{
      id
      descripcion
    }
    rutas{
      id
      descripcion
    }
    usuarios{
      nombre
      ap_paterno
      ap_materno
    }
  }
  carritos{
    id
    cantidad
    usuario{
      id
      nombre
      ap_paterno
      ap_materno
    }
    productos{
      id
      nombre
    }
  }
  compras{
    id
    costo
    fecha_pedido
    referencia
    fecha_llegada
    status
    metodo_pago{
      id
    }
    lote{
      id
      codigo_interno
    }
    proveedor{
      id
      nombre
    }
  }
  creditos(where:{
    mostrar:true
  }){
    id
    limite
    fecha_alta
    fecha_baja
    vigencia
    intereses
    status
    usuario{
      id
      nombre
      ap_paterno
      ap_materno
    }
    metodo_pago{
      id
    }
    abonos{
      id
    }
  }
  dimensiones{
    id
    nombre
    ancho
    alto
    largo
    productos{
      id
      nombre
    }
  }
  gastos{
    id
    descripcion
    fecha
    monto
    categoria
    status
    usuario{
      id
      nombre
      ap_paterno
      ap_materno
    }
    camion{
      id
      num_serie
    }

  }
  historials{
    id
    fecha
    status
    hora_inicio
    hora_fin
    usuario{
      id
      nombre
      ap_paterno
      ap_materno
    }
    camiones{
      id
      num_serie
    }
  }
  locals{
    id
    nombre
    alias
    razon_social
    rfc
    fecha_alta
    calle
    colonia
    numero_ext
    municipio
    numero_int
    ciudad
    cp
    latitud
    longitud
    telefono
    telefono_cel
    giro
    status
    ventas{
      id
    }
    usuarios{
      id
      nombre
      ap_paterno
      ap_materno
    }
  }
  lotes{
    id
    codigo_interno
    fecha_arrivo
    fecha_caducidad
    fecha_adquisicion
    costo
    compras{
      id
      costo
    }
    productos{
      id
      nombre
    }
  }
  metodoPagos{
    id
    numero_tarjeta
    mes
    anio
    cvc
    titular
    fecha_expedicion
    fecha_ingreso
    folio
    referencia
    tipo
    descripcion
    usuario{
      id
      nombre
      ap_paterno
      ap_materno
    }
    venta{
      id
    }
    creditos{
      id
      limite
    }
    compras{
      id
    }
  }
  productos{
    id
    nombre
    codigo_barras
    codigo_interno
    peso_neto
    presentacion
    marca
    descripcion_generica
    precio
    costo
    inventario_disp
    value_min
    status
    venta_gramos
    dimension{
      id
    }
    lote{
      id
    }
    promociones{
      id
    }
    proveedor{
      id
    },
    carritos{
      id
    }
  }
  promociones{
    id
    fecha_creacion
    fecha_vigencia
    valor_descuento
    codigo_ref
    condicion
    productos{
      id
      nombre
    }
  }
  proveedors{
    id
    nombre
    razon_social
    rfc
    fecha_alta
    calle
    numero
    colonia
    cp
    municipio
    ciudad
    pais
    visita_programada
    status
    productos{
      id
      nombre
    }
    compras{
      id
    }
  }
  rutas{
    id
    descripcion
    lugar_origen
    destino
    fecha_salida
    fecha_llegada
    ruta_ciclica
    referencia
    nombre_mercancia_recibida
    comentarios
    estado
    ventas{
      id
      monto
    }
    camiones{
      id
      num_serie
    }
  }
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
      nombre
    }
    gastos{
      id
      monto
    }
    ventas{
      id
    }
    camiones{
      id
      num_serie
    },
    carritos{
      id
      cantidad
    },
    abonos{
      id
      fecha_abono
    }
    creditos{
      id
      limite
    }
    historiales{
      id
      fecha
    }
    metodo_pagos{
      id
      numero_tarjeta
    }
  }
  vendedores{
    id
    nombre
    ventas{
      id
    }
  }
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
      nombre
      ap_paterno
      ap_materno
    }
    local{
      id
      nombre
    }
    rutas{
      id
      descripcion
    }
    vendedores{
      id
      nombre
    }
    carritos{
      id
      cantidad
    }
    metodo_pagos{
      id
      numero_tarjeta
    }
  }
}`;
@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  private abonosSubject = new BehaviorSubject<any>([]);
  abonos$ = this.abonosSubject.asObservable();
  private camionesSubject = new BehaviorSubject<any>([]);
  camiones$ = this.camionesSubject.asObservable();
  private carritosSubject = new BehaviorSubject<any>([]);
  carritos$ = this.carritosSubject.asObservable();
  private comprasSubject = new BehaviorSubject<any>([]);
  compras$ = this.comprasSubject.asObservable();
  private creditosSubject = new BehaviorSubject<any>([]);
  creditos$ = this.creditosSubject.asObservable();
  private dimensionesSubject = new BehaviorSubject<any>([]);
  dimensiones$ = this.dimensionesSubject.asObservable();
  private gastosSubject = new BehaviorSubject<any>([]);
  gastos$ = this.gastosSubject.asObservable();
  private historialesSubject = new BehaviorSubject<any>([]);
  historiales$ = this.historialesSubject.asObservable();
  private localesSubject = new BehaviorSubject<any>([]);
  locales$ = this.localesSubject.asObservable();
  private lotesSubject = new BehaviorSubject<any>([]);
  lotes$ = this.lotesSubject.asObservable();
  private metodoPagoSubject = new BehaviorSubject<any>([]);
  metodoPago$ = this.metodoPagoSubject.asObservable();
  private productosSubject = new BehaviorSubject<any>([]);
  productos$ = this.productosSubject.asObservable();
  private promocionesSubject = new BehaviorSubject<any>([]);
  promociones$ = this.promocionesSubject.asObservable();
  private proveedoresSubject = new BehaviorSubject<any>([]);
  proveedores$ = this.proveedoresSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  private rutasSubject = new BehaviorSubject<any>([]);
  rutas$ = this.rutasSubject.asObservable();
  private vendedoresSubject = new BehaviorSubject<any>([]);
  vendedores$ = this.vendedoresSubject.asObservable();
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
   GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const { abonos, camiones,carritos,compras,creditos,dimensiones,gastos, historials, locals,lotes, metodosDePagos, productos, promociones, proveedors, usuarios, rutas, vendedorS, ventas} = data;
      this.abonosSubject.next(abonos);
      this.camionesSubject.next(camiones);
      this.carritosSubject.next(carritos);
      this.comprasSubject.next(compras);
      this.creditosSubject.next(creditos);
      this.dimensionesSubject.next(dimensiones);
      this.gastosSubject.next(gastos);
      this.historialesSubject.next(historials);
      this.localesSubject.next(locals);
      this.metodoPagoSubject.next(metodosDePagos);
      this.productosSubject.next(productos);
      this.promocionesSubject.next(promociones);
      this.proveedoresSubject.next(proveedors);
      this.usuariosSubject.next(usuarios);
      this.rutasSubject.next(rutas);
      this.vendedoresSubject.next(vendedorS);
      this.ventasSubject.next(ventas);
      this.lotesSubject.next(lotes);
    },
    (error) => {
      console.log(error);
      alert('Error');
    }
    );
  }
}
