import { FormBuilder, Validators } from '@angular/forms';
export const registerForm = {
  nombre: ['',[Validators.required, Validators.minLength(3)]],
  ap_paterno: ['',[Validators.required, Validators.minLength(3)]],
  ap_materno: ['',[Validators.required, Validators.minLength(3)]],
  fecha_nac: ['',[Validators.required]],
  genero: ['',[Validators.required]],
  fecha_ins: ['',[Validators.required]],
  fecha_alta: ['',[Validators.required]],
  rfc: ['',[Validators.required,  Validators.minLength(14), Validators.maxLength(14)]],
  curp: ['',[Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
  nss: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
  tel_cel: ['',[Validators.required, Validators.maxLength(10)]],
  email: ['',[Validators.required, Validators.email]],
  password: ['',[Validators.required, Validators.minLength(6)]],
  tipo_sangre: ['',[Validators.required]],
  licencia: ['',[Validators.required]],
  alergias: ['',[Validators.required]],
  padecimientos: ['',[Validators.required]],
  nacionalidad: ['',[Validators.required]],
  calle: ['',[Validators.required]],
  numero: ['',[Validators.required]],
  colonia: ['',[Validators.required]],
  cp: ['',[Validators.required]],
  municipio: ['',[Validators.required]],
  ciudad: ['',[Validators.required]],
  pais: ['',[Validators.required]],
  ref_dir: ['',[Validators.required]],
  _id: ['',[Validators.required]],
  status: ['',[Validators.required]],
  comment: ['',[Validators.required]],
}
export const abonosForm = {
  cantidad_abono: ['',[Validators.required]],
  fecha_abono: [{value: '', disabled: true},  Validators.required],
  estado_abono:  ['',[Validators.required]],
  credito_id: [''],
  usuario_id:  [''],
}
// export const camionesForm = {
//   num_serie: ['',[Validators.required]],
//   niv:['',[Validators.required]],
//   placas:FormBuilder.array([FormBuilder.group({
//     placa:['',[Validators.required]],
//     activa:['',[Validators.required]],
//     estado:['',[Validators.required]]
//   })]),
// }
export const carritosForm = {
  cantidad: ['',[Validators.required]],
  id_productos:[''],
  id_usuario:[''],
}
export const comprasForm = {
  costo: ['',[Validators.required]],
  fecha_pedido: ['',[Validators.required]],
  referencia: ['',[Validators.required]],
  fecha_llegada: ['',[Validators.required]],
  status: ['',[Validators.required]],
  id_metodoPago:[''],
  id_lote:[''],
  id_proveedor:['']
}
export const creditosForm = {
  limite: ['',[Validators.required]],
  Fecha_alta: ['',[Validators.required]],
  fecha_baja: ['',[Validators.required]],
  vigencia: ['',[Validators.required]],
  intereses: ['',[Validators.required]],
  status: ['',[Validators.required]],
  id_usuario:[''],
  id_metodoPago:[''],
  id_abonos:['']
}
export const dimensionesForm = {
  Nombre: ['',[Validators.required]],
  ancho: ['',[Validators.required]],
  alto: ['',[Validators.required]],
  largo: ['',[Validators.required]],
  id_productos:['']
}
export const gastosForm = {
  descripcion: ['',[Validators.required]],
  fecha: ['',[Validators.required]],
  monto: ['',[Validators.required]],
  categoria: ['',[Validators.required]],
  status: ['',[Validators.required]],
  id_usuario:[''],
  id_camion:['']
}
export const historialesForm = {
  fecha: ['',[Validators.required]],
  status: ['',[Validators.required]],
  hora_inicio: ['',[Validators.required]],
  hora_fin: ['',[Validators.required]],
  id_usuario:[''],
  id_camiones:['']
}
export const localesForm = {
  nombre:['',[Validators.required]],
  alias:['',[Validators.required]],
  razon_social:['',[Validators.required]],
  rfc: ['',[Validators.required,  Validators.minLength(14), Validators.maxLength(14)]],
  fecha_alta:['',[Validators.required]],
  calle:['',[Validators.required]],
  Colonia:['',[Validators.required]],
  numero_ext:['',[Validators.required]],
  Municipio:['',[Validators.required]],
  numero_int:['',[Validators.required]],
  ciudad:['',[Validators.required]],
  cp:['',[Validators.required]],
  latitud:['',[Validators.required]],
  longitud:['',[Validators.required]],
  telefono:['',[Validators.required]],
  telefono_cel:['',[Validators.required]],
  giro:['',[Validators.required]],
  status:['',[Validators.required]],
  id_ventas:[''],
  id_usuario:['']
}
export const lotesForm = {
  Codigo_interno:['',[Validators.required]],
  fecha_arrivo:['',[Validators.required]],
  fecha_caducidad:['',[Validators.required]],
  fecha_adquisio: ['',[Validators.required]],
  costo:['',[Validators.required]],
  costo_compra:[''],
  nombre_producto:['']
}
export const metodoPagoForm = {
  numero_tarjeta:['',[Validators.required]],
  mes:['',[Validators.required]],
  anio:['',[Validators.required]],
  cvc:['',[Validators.required]],
  titular:['',[Validators.required]],
  fecha_expedicion:['',[Validators.required]],
  fecha_ingreso:['',[Validators.required]],
  folio:['',[Validators.required]],
  referencia:['',[Validators.required]],
  tipo:['',[Validators.required]],
  descripcion:['',[Validators.required]],
  id_usuario:[''],
  id_venta:[''],
  id_creditos:[''],
  id_compras:['']
}
export const productosForm = {
  nombre:['',[Validators.required]],
  codigo_barras:['',[Validators.required]],
  codigo_interno:['',[Validators.required]],
  peso_neto:['',[Validators.required]],
  presentacion:['',[Validators.required]],
  marca:['',[Validators.required]],
  descripcion_generica:['',[Validators.required]],
  precio:['',[Validators.required]],
  costo:['',[Validators.required]],
  inventario_disp:['',[Validators.required]],
  value_min:['',[Validators.required]],
  status:['',[Validators.required]],
  venta_gramos:['',[Validators.required]],
  id_dimension:[''],
  id_lote:[''],
  id_promociones:[''],
  id_proveedor:[''],
  id_carritos:['']
}
export const promocionesForm ={
  fecha_creacion:['',[Validators.required]],
  fecha_vigencia:['',[Validators.required]],
  valor_descuento:['',[Validators.required]],
  codigo_ref:['',[Validators.required]],
  condicion:['',[Validators.required]],
  producto_nombre:['']
}
export const proveedoresForm = {
  nombre:['',[Validators.required]],
  razon_social:['',[Validators.required]],
  rfc: ['',[Validators.required,  Validators.minLength(14), Validators.maxLength(14)]],
  fecha_alta:['',[Validators.required]],
  calle:['',[Validators.required]],
  numero:['',[Validators.required]],
  colonia:['',[Validators.required]],
  cp:['',[Validators.required]],
  municipio:['',[Validators.required]],
  ciudad:['',[Validators.required]],
  pais:['',[Validators.required]],
  visita_programada:['',[Validators.required]],
  status:['',[Validators.required]],
  producto_nombre:[''],
  id_compra:[''],
}
export const rutasForm = {
  descripcion:['',[Validators.required]],
  lugar_origen:['',[Validators.required]],
  destino:['',[Validators.required]],
  fecha_salida:['',[Validators.required]],
  fecha_llegada:['',[Validators.required]],
  ruta_ciclica:[false,[Validators.required]],
  referencia:['',[Validators.required]],nombre_mercancia_recibida:['',[Validators.required]],comentarios:['',[Validators.required]],
  estado:['',[Validators.required]],
  monto_venta:[''],
  num_serie_camion:['']
}
export const usuariosForm = {
  nombre: ['',[Validators.required, Validators.minLength(3)]],
  ap_paterno: ['',[Validators.required, Validators.minLength(3)]],
  ap_materno: ['',[Validators.required, Validators.minLength(3)]],
  fecha_nac: ['',[Validators.required]],
  genero: ['',[Validators.required]],
  fecha_ins: ['',[Validators.required]],
  fecha_alta: ['',[Validators.required]],
  rfc: ['',[Validators.required,  Validators.minLength(14), Validators.maxLength(14)]],
  curp: ['',[Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
  nss: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
  tel_cel: ['',[Validators.required, Validators.maxLength(10)]],
  email: ['',[Validators.required, Validators.email]],
  tipo_sangre: ['',[Validators.required]],
  licencia: ['',[Validators.required]],
  alergias: ['',[Validators.required]],
  padecimientos: ['',[Validators.required]],
  nacionalidad: ['',[Validators.required]],
  calle: ['',[Validators.required]],
  numero: ['',[Validators.required]],
  colonia: ['',[Validators.required]],
  cp: ['',[Validators.required]],
  municipio: ['',[Validators.required]],
  ciudad: ['',[Validators.required]],
  pais: ['',[Validators.required]],
  ref_dir: ['',[Validators.required]],
  rol_id: ['',[Validators.required]],
  status: ['',[Validators.required]],
  comment: ['',[Validators.required]],
  monto_gasto:[''],
  nombre_local:[''],
  monto_venta:[''],
  num_serie_camion:[''],
  id_carrito:[''],
  cantidad_abono:[''],
  limite_credito:[''],
  fecha_historial:[''],
  numero_tarjeta_metodo_pago:['']
}
export const vendedoresForm = {
  nombre:['',[Validators.required]],
  monto_venta:['']
}
export const ventasForm = {
  monto: ['',[Validators.required]],
  monto_total:['',[Validators.required]],
  fecha:['',[Validators.required]],
  status:[false,[Validators.required]],
  clasificacion:['',[Validators.required]],
  fecha_entrega:['',[Validators.required]],
  entrega_pendiente:[false,[Validators.required]],
  pagada:[false,[Validators.required]],
  nombre_usuario:[''],
  nombre_local:[''],
  lugar_origen_ruta:[''],
  nombre_vendedor:[''],
  cantidad_carrito:[''],
  numero_tarjeta_metodo_pago:['']
}
