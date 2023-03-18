export const table ={
  Abonos:{
    title: 'Abonos',
    columns:['no','cantidad_abono','fecha_abono','estado_abono','usuario','credito','acciones'],
    data:['id','cantidad_abono','fecha_abono','estado_abono'],
    campo:['Id','Cantidad de abono','Fecha de abono','Estado de abono']
  },
  //
  Camiones:{
    title: 'Camiones',
    columns:['no','id', 'num_serie', 'niv', 'placas','historial','rutas','gastos','usuario','acciones'],
    data:['id', 'num_serie','placas','niv'],
    campo:['Id', 'Numero de serie', 'Placa  Activa', 'Nivel']
  },
  Carritos:{
    title: 'Carritos',
    columns:['no','id', 'cantidad','usuario','productos','venta','acciones'],
    data:['id', 'cantidad'],
    campo:['Id', 'Cantidad'],
  },
  Compras:{
    title: 'Compras',
    columns:['no','id','costo','fecha_pedido','referencia','fecha_llegada','status','metodo_pago','lote','proveedor','usuarios','acciones'],
    data:['id','costo','fecha_pedido','referencia','fecha_llegada','status'],
    campo:['Id','Costo','Fecha de pedido','Referencia','Fecha de llegada','Status'],
  },
  Creditos:{
    title: 'Creditos',
    columns:['no','id','limite','fecha_alta','fecha_baja','vigencia','intereses','status','usuario','metodo_pago','abonos','acciones'],
    data:['id','limite','Fecha_alta','fecha_baja','vigencia','intereses','status'],
    campo:['Id','Limite','Fecha de alta','Fecha de baja','Vigencia','Intereses','Status']
  },
  Dimensiones:{
    title: 'Dimensiones',
    columns:['no','id','nombre','ancho','alto','largo','productos','acciones'],
    data:['id','nombre','ancho','alto','largo'],
    campo:['Id','Nombre','Ancho','Alto','Largo'],
  },
  Gastos:{
    title: 'Gastos',
    columns:['no','id','descripcion','fecha','monto','categoria','status','usuario','camiones','acciones'],
    data:['id','descripcion','fecha','monto','categoria','status'],
    campo:['Id','Descripcion', 'Fecha','Monto','Categoria','Estados']
  },
  Historiales:{
    title: 'Historiales',
    columns:['no','id','fecha','status','hora_inicio','hora_fin','usuario','camiones','acciones'],
    data:['id','fecha','status','hora_inicio','hora_fin'],
    campo:['Id', 'Fecha','Status', 'Hora de inicio', 'Hora de fin']
  },
  Locales:{
    title: 'Locales',
    columns:['no','id','nombre','alias','razon_social','rfc','fecha_alta','calle','colonia','numero_ext', 'municipio','numero_int','ciudad','cp','latitud','longitud','telefono','telefono_cel','giro','status','ventas','usuarios','acciones'],
    data:['id','nombre','alias','razon_social','rfc','fecha_alta','calle','Colonia','numero_ext', 'Municipio','numero_int','ciudad','cp','latitud','longitud','telefono','telefono_cel','giro','status'],
    campo:['Id','Nombre','Alias','Razon social','RFC','Fecha alta','Calle','Colonia','Numero exterior','Municipio','numero_int','Ciudad','Codigo Postal','Latitud','Longitud','Telefono','Telefono celular','Giro','Status']
  },
  Lotes:{
    title:'Lotes',
    columns:['no','id','codigo_interno','fecha_arrivo','fecha_caducidad','fecha_adquisicion','costo','compras','productos','acciones'],
    data:['id','codigo_interno','fecha_arrivo','fecha_caducidad','fecha_adquisicion','costo'],
    campo:['Id','Codigo interno','Fecha de arrivo','Fecha de caducidad','Fecha de adquisición','Costo']
  },
  MetodoPagos:{
    title: 'Metodo de Pago',
    columns:['no','id','numero_tarjeta','mes','anio','cvc','titular','fecha_expedicion','fecha_ingreso','folio','referencia','tipo','descripcion','usuario','venta','creditos','compras','acciones'],
    data:['id','numero_tarjeta','mes','anio','cvc','titular','fecha_expedicion','fecha_ingreso','folio','referencia','tipo','descripcion'],
    campo:['Id','Numero de tarjeta','Mes','Año','CVC','Titular','Fecha de expedicion','Fecha de ingreso','Folio','Referencia','Tipo','Descripcion']
  },
  Productos:{
    title: 'Productos',
    columns:['no','id','nombre','codigo_barras','codigo_interno','peso_neto','presentacion','marca','descripcion_generica','precio','costo','inventario_disp','valor_min','status','venta_gramos','dimension','lote','proveedor','promociones','carritos','acciones'],
    data:['id','nombre','codigo_barras','codigo_interno','peso_neto','presentacion','marca','descripcion_generica','precio','costo','inventario_disp','value_min','status','venta_gramos'],
    campo:['Id','Nombre','Codigo de barras','Codigo interno','Peso neto','Presentacion','Marca','Descripcion generica','Precio','Costo','Inventario disponible','Valor minimo','Status', 'Venta en gramos']
  },
  Promociones:{
    title: 'Promociones',
    columns:['no','id','fecha_creacion','fecha_vigencia','valor_descuento','codigo_ref','condicion','productos','acciones'],
    data:['id','fecha_creacion','fecha_vigencia','valor_descuento','codigo_ref','condicion'],
    campo:['id','Fecha de creacion','Fecha de vigencia','Valor de descuento','Codigo referencia','Condicion'],
  },
  Proveedores:{
    title: 'Proveedores',
    columns:['no','id','nombre','razon_social','rfc','fecha_alta','calle','numero','colonia','cp','municipio','ciudad','pais','visita_programada','status','productos','compras','acciones'],
    data:['id','nombre','razon_social','rfc','fecha_alta','calle','numero','colonia','cp','municipio','ciudad','pais','visita_programada','status'],
    campo:['Id','Nombre','Razon Social','RFC','Fecha de alta','Calle','Numero','Colonia','Codigo Postal','Municipio','Ciudad','Pais','Visita Programada','Status']
  },
  Rutas:{
    title: 'Rutas',
    columns:['no','id','descripcion','lugar_origen','destino','fecha_salida','fecha_llegada','ruta_ciclica','referencia','nombre_mercancia_recibida','comentarios','estado','ventas','camiones','acciones'],
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
    data:['id','nombre','ap_paterno','ap_materno','fecha_nac','genero','fecha_ins','fecha_alta','rfc','curp','nss','tel_cel','email','tipo_sangre','licencia','alergias','padecimientos','nacionalidad','calle','numero','colonia','cp','municipio','ciudad','pais','tipo_rol','referencia_directa','comment'],
    campo:['Id','Nombre','Apellido Paterno', 'Apellido Materno','Fecha de nacimiento','Genero','Fecha de incripcion','Fecha de alta','RFC','CURP','NSS','Telefono Celular', 'Email', 'Tipo de sangre', 'Licencia','Alergicas','Padecimientos','Nacionalidad','Calle','Numero','Colonia','Codigo Postal','Municipio','Ciudad','Pais','Tipo de usuario','Referencia directa', 'Comentario']
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
