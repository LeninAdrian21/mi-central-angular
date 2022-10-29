export const table ={
  Abonos:{
    title: 'Abonos',
    columns:['id','cantidad_abono','fecha_abono','estado_abono','nombre_usuario','id_credito','limite_credito','acciones'],
    data:['id','cantidad_abono','fecha_abono','estado_abono'],
    campo:['Id','Cantidad de abono','Fecha de abono','Estado de abono']
  },
  Camiones:{
    title: 'Camiones',
    columns:['id', 'num_serie','niv','placas','activa','id_historial','id_gastos','descripcion','id_ruta','descripcion_ruta','nombre_usaurio','acciones'],
    data:['id', 'num_serie','placas','niv'],
    campo:['Id', 'Numero de serie', 'Placa  Activa', 'Nivel']
  },
  Carritos:{
    title: 'Carritos',
    columns:['id', 'cantidad','nombre_usuario','id_producto','nombre_producto','acciones'],
    data:['id', 'cantidad'],
    campo:['Id', 'Cantidad'],
  },
  Compras:{
    title: 'Compras',
    columns:['id','costo','fecha_pedido','referencia','fecha_llegada','status','id_metodo_pago','id_lote','codigo_interno_lote','id_proveedor','nombre_proveedor','acciones'],
    data:['id','costo','fecha_pedido','referencia','fecha_llegada','status'],
    campo:['Id','Costo','Fecha de pedido','Referencia','Fecha de llegada','Status'],
  },
  Creditos:{
    title: 'Creditos',
    columns:['id','limite','Fecha_alta','fecha_baja','vigencia','intereses','status','id_usuario','id_metodo_pago','id_abono','acciones'],
    data:['id','limite','Fecha_alta','fecha_baja','vigencia','intereses','status'],
    campo:['Id','Limite','Fecha de alta','Fecha de baja','Vigencia','Intereses','Status']
  },
  Dimensiones:{
    title: 'Dimensiones',
    columns:['id','Nombre','ancho','alto','largo','productos','productos_nombre','acciones'],
    data:['id','Nombre','ancho','alto','largo'],
    campo:['Id','Nombre','Ancho','Alto','Largo'],
  },
  Gastos:{
    title: 'Gastos',
    columns:['id','descripcion','fecha','monto','categoria','status','usuario_nombre','camion','acciones'],
    data:['id','descripcion','fecha','monto','categoria','status'],
    campo:['Id','Descripcion', 'Fecha','Monto','Categoria','Estados']
  },
  Historiales:{
    title: 'Historiales',
    columns:['id','fecha','status','hora_inicio','hora_fin','usuario_nombre','camion_num_serie','acciones'],
    data:['id','fecha','status','hora_inicio','hora_fin'],
    campo:['Id', 'Fecha','Status', 'Hora de inicio', 'Hora de fin']
  },
  Locales:{
    title: 'Locales',
    columns:['id','nombre','alias','razon_social','rfc','fecha_alta','calle','Colonia','numero_ext', 'Municipio','numero_int','ciudad','cp','latitud','longitud','telefono','telefono_cel','giro','status','ventas_id','usuario_nombre','acciones'],
    data:['id','nombre','alias','razon_social','rfc','fecha_alta','calle','Colonia','numero_ext', 'Municipio','numero_int','ciudad','cp','latitud','longitud','telefono','telefono_cel','giro','status'],
    campo:['Id','Nombre','Alias','Razon social','RFC','Fecha alta','Calle','Colonia','Numero exterior','Municipio','numero_int','Ciudad','Codigo Postal','Latitud','Longitud','Telefono','Telefono celular','Giro','Status']
  },
  Lotes:{
    title:'Lotes',
    columns:['id','Codigo_interno','fecha_arrivo','fecha_caducidad','fecha_adquisio','costo','costo_compra','nombre_producto','acciones'],
    data:['id','Codigo_interno','fecha_arrivo','fecha_caducidad','fecha_adquisio','costo'],
    campo:['Id','Codigo interno','Fecha de arrivo','Fecha de caducidad','Fecha de adquisición','Costo']
  },
  MetodoPago:{
    title: 'Metodo de Pago',
    columns:['id','numero_tarjeta','mes','anio','cvc','titular','fecha_expedicion','fecha_ingreso','folio','referencia','tipo','descripcion','usuario_nombre','venta_id','credito_limite','compras_id','acciones'],
    data:['id','numero_tarjeta','mes','anio','cvc','titular','fecha_expedicion','fecha_ingreso','folio','referencia','tipo','descripcion'],
    campo:['Id','Numero de tarjeta','Mes','Año','CVC','Titular','Fecha de expedicion','Fecha de ingreso','Folio','Referencia','Tipo','Descripcion']
  },
  Productos:{
    title: 'Productos',
    columns:['id','nombre','codigo_barras','codigo_interno','peso_neto','presentacion','marca','descripcion_generica','precio','costo','inventario_disp','value_min','status','venta_gramos','id_dimension','id_lote','id_promocion','id_proveedor','id_carrito','acciones'],
    data:['id','nombre','codigo_barras','codigo_interno','peso_neto','presentacion','marca','descripcion_generica','precio','costo','inventario_disp','value_min','status','venta_gramos'],
    campo:['Id','Nombre','Codigo de barras','Codigo interno','Peso neto','Presentacion','Marca','Descripcion generica','Precio','Costo','Inventario disponible','Valor minimo','Status', 'Venta en gramos']
  },
  Promociones:{
    title: 'Promociones',
    columns:['id','fecha_creacion','fecha_vigencia','valor_descuento','codigo_ref','condicion','producto_nombre','acciones'],
    data:['id','fecha_creacion','fecha_vigencia','valor_descuento','codigo_ref','condicion'],
    campo:['id','Fecha de creacion','Fecha de vigencia','Valor de descuento','Codigo referencia','Condicion'],
  },
  Proveedores:{
    title: 'Proveedores',
    columns:['id','nombre','razon_social','rfc','fecha_alta','calle','numero','colonia','cp','municipio','ciudad','pais','visita_programada','status','productos_nombre','id_compra','acciones'],
    data:['id','nombre','razon_social','rfc','fecha_alta','calle','numero','colonia','cp','municipio','ciudad','pais','visita_programada','status'],
    campo:['Id','Nombre','Razon Social','RFC','Fecha de alta','Calle','Numero','Colonia','Codigo Postal','Municipio','Ciudad','Pais','Visita Programada','Status']
  },
  Rutas:{
    title: 'Rutas',
    columns:['id','descripcion','lugar_origen','destino','fecha_salida','fecha_llegada','ruta_ciclica','referencia','nombre_mercancia_recibida','comentarios','estado','monto_ventas','num_serie_camiones','acciones'],
    data:['id','descripcion','lugar_origen','destino','fecha_salida','fecha_llegada','ruta_ciclica','referencia','nombre_mercancia_recibida','comentarios','estado'],
    campo:['Id','Descripcion','Lugar de origen','Destino','Fecha de salida','Fecha de llegada','Ruta ciclica','Referencia','Nombre aquien se le entrega mercancia','Comentarios','Status']
  },
  TipoRol:{
    title: 'Tipo de Rol',
    columns:[],
    data:['id','rol'],
    campo:['Id','Rol']
  },
  Usuarios:{
    title: 'Usuarios',
    columns:['id',
    'nombre',
    'ap_paterno',
    'ap_materno',
    'fecha_nacimiento',
    'genero',
    'fecha_inscripcion',
    'fecha_alta',
    'rfc',
    'curp',
    'nss',
    'tel_cel',
    'email',
    'tipo_sangre',
    'licencia',
    'alergias',
    'padecimientos',
    'nacionalidad',
    'calle',
    'numero',
    'colonia',
    'cp',
    'municipio',
    'ciudad',
    'pais',
    'referencia_directa',
    'comment',
    'last_login',
    'status',
    'rol_id',
    'nombre_local',
    'monto_gasto',
    'ventas_id',
    'num_serie_camiones',
    'cantidad_carritos',
    'fecha_abono',
    'limite_credito',
    'fecha_historial',
    'numero_tarjeta_metodo_pago',
    'acciones'],
    data:['id','nombre','ap_paterno','ap_materno','fecha_nac','genero','fecha_ins','fecha_alta','rfc','curp','nss','tel_cel','email','tipo_sangre','licencia','alergias','padecimientos','nacionalidad','calle','numero','colonia','cp','municipio','ciudad','pais','tipo_usuario','ref_dir','comment'],
    campo:['Id','Nombre','Apellido Paterno', 'Apellido Materno','Fecha de nacimiento','Genero','Fecha de incripcion','Fecha de alta','RFC','CURP','NSS','Telefono Celular', 'Email', 'Tipo de sangre', 'Licencia','Alergicas','Padecimientos','Nacionalidad','Calle','Numero','Colonia','Codigo Postal','Municipio','Ciudad','Pais','Tipo de usuario','Referncia directa', 'Comentario']
  },
  Vendedores:{
    title: 'Vendedores',
    columns:['id','nombre','id_ventas', 'acciones']
  },
  Ventas:{
    title: 'Ventas',
    columns:['id','monto','monto_total','fecha','status','clasificacion','fecha_entrega','entrega_pendiente','pagada','id_usuario','id_local','id_rutas','id_vendedor','id_carritos','id_metodos-pago','acciones'],
    data:['id','monto','monto_total','fecha','status','clasificacion','fecha_entrega','entrega_pendiente','pagada'],
    campo:['Id','Monto','Monto total','Fecha','Status','Clasificacion','Fecha de entrega','Entrega pendiente','Pagada']
  },
}
