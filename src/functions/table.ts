export const table ={
  Abonos:{
    title: 'Abonos',
    columns:['cantidad_abono','fecha_abono','estado_abono','usuario','credito','acciones'],
    data:['id','cantidad_abono','fecha_abono','estado_abono'],
    campo:['Id','Cantidad de abono','Fecha de abono','Estado de abono']
  },
  //
  Camiones:{
    title: 'Camiones',
    columns:['num_serie', 'niv', 'placas','historial','rutas','gastos','usuario','acciones'],
    data:['id', 'num_serie','placas','niv'],
    campo:['Id', 'Numero de serie', 'Placa  Activa', 'Nivel']
  },
  Carritos:{
    title: 'Carritos',
    columns:['cantidad','usuario','productos','venta','acciones'],
    data:['id', 'cantidad'],
    campo:['Id', 'Cantidad'],
  },
  Compras:{
    title: 'Compras',
    columns:['costo','fecha_pedido','referencia','fecha_llegada','status','metodo_pago','lote','proveedor','usuarios','acciones'],
    data:['id','costo','fecha_pedido','referencia','fecha_llegada','status'],
    campo:['Id','Costo','Fecha de pedido','Referencia','Fecha de llegada','Status'],
  },
  Creditos:{
    title: 'Creditos',
    columns:['limite','fecha_alta','fecha_baja','vigencia','intereses','status','usuario','metodo_pago','abonos','acciones'],
    data:['id','limite','Fecha_alta','fecha_baja','vigencia','intereses','status'],
    campo:['Id','Limite','Fecha de alta','Fecha de baja','Vigencia','Intereses','Status']
  },
  Dimensiones:{
    title: 'Dimensiones',
    columns:['nombre','ancho','alto','largo','productos','acciones'],
    data:['id','nombre','ancho','alto','largo'],
    campo:['Id','Nombre','Ancho','Alto','Largo'],
  },
  Gastos:{
    title: 'Gastos',
    columns:['descripcion','fecha','monto','categoria','status','usuario','camiones','acciones'],
    data:['id','descripcion','fecha','monto','categoria','status'],
    campo:['Id','Descripcion', 'Fecha','Monto','Categoria','Estados']
  },
  Historiales:{
    title: 'Historiales',
    columns:['fecha','status','hora_inicio','hora_fin','usuario','camiones','acciones'],
    data:['id','fecha','status','hora_inicio','hora_fin'],
    campo:['Id', 'Fecha','Status', 'Hora de inicio', 'Hora de fin']
  },
  Locales:{
    title: 'Locales',
    columns:['nombre','alias','razon_social','rfc','fecha_alta','calle','colonia','numero_ext', 'municipio','numero_int','ciudad','cp','latitud','longitud','telefono','telefono_cel','giro','status','ventas','usuarios','acciones'],
    data:['id','nombre','alias','razon_social','rfc','fecha_alta','calle','Colonia','numero_ext', 'Municipio','numero_int','ciudad','cp','latitud','longitud','telefono','telefono_cel','giro','status'],
    campo:['Id','Nombre','Alias','Razon social','RFC','Fecha alta','Calle','Colonia','Numero exterior','Municipio','numero_int','Ciudad','Codigo Postal','Latitud','Longitud','Telefono','Telefono celular','Giro','Status']
  },
  Lotes:{
    title:'Lotes',
    columns:['codigo_interno','fecha_arrivo','fecha_caducidad','fecha_adquisicion','costo','compras','productos','acciones'],
    data:['id','codigo_interno','fecha_arrivo','fecha_caducidad','fecha_adquisicion','costo'],
    campo:['Id','Codigo interno','Fecha de arrivo','Fecha de caducidad','Fecha de adquisición','Costo']
  },
  MetodoPagos:{
    title: 'Metodo de Pago',
    columns:[
      'numero_tarjeta',
      'mes','anio','cvc','titular','folio','fecha_expedicion','fecha_ingreso','descripcion','referencia','tipo','compras','creditos','usuario','venta',
      'acciones'],
    data:['id','numero_tarjeta','mes','anio','cvc','titular','fecha_expedicion','fecha_ingreso','folio','referencia','tipo','descripcion'],
    campo:['Id','Numero de tarjeta','Mes','Año','CVC','Titular','Fecha de expedicion','Fecha de ingreso','Folio','Referencia','Tipo','Descripcion']
  },
  Productos:{
    title: 'Productos',
    columns:['nombre','codigo_barras','codigo_interno','peso_neto','presentacion','marca','descripcion_generica','precio','costo','inventario_disp','valor_min','status','venta_gramos','dimension','lote','proveedor','promociones','carritos','acciones'],
    data:['id','nombre','codigo_barras','codigo_interno','peso_neto','presentacion','marca','descripcion_generica','precio','costo','inventario_disp','value_min','status','venta_gramos'],
    campo:['Id','Nombre','Codigo de barras','Codigo interno','Peso neto','Presentacion','Marca','Descripcion generica','Precio','Costo','Inventario disponible','Valor minimo','Status', 'Venta en gramos']
  },
  Promociones:{
    title: 'Promociones',
    columns:['fecha_creacion','fecha_vigencia','valor_descuento','codigo_ref','condicion','productos','acciones'],
    data:['id','fecha_creacion','fecha_vigencia','valor_descuento','codigo_ref','condicion'],
    campo:['id','Fecha de creacion','Fecha de vigencia','Valor de descuento','Codigo referencia','Condicion'],
  },
  Proveedores:{
    title: 'Proveedores',
    columns:['nombre','razon_social','rfc','fecha_alta','calle','numero','colonia','cp','municipio','ciudad','pais','visita_programada','status','productos','compras','acciones'],
    data:['id','nombre','razon_social','rfc','fecha_alta','calle','numero','colonia','cp','municipio','ciudad','pais','visita_programada','status'],
    campo:['Id','Nombre','Razon Social','RFC','Fecha de alta','Calle','Numero','Colonia','Codigo Postal','Municipio','Ciudad','Pais','Visita Programada','Status']
  },
  Rutas:{
    title: 'Rutas',
    columns:['descripcion','lugar_origen','destino','fecha_salida','fecha_llegada','referencia','nombre_mercancia_recibida','comentarios','estado','ruta_ciclica','camiones','ventas','acciones'],
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
    columns:['nombre','ap_paterno','ap_materno','fecha_nacimiento','genero','fecha_inscripcion','fecha_alta','rfc','curp','nss','tel_cel','tel_cel3','email','tipo_sangre','licencia','alergias','padecimientos','nacionalidad','calle','numero','colonia','cp','municipio','ciudad','pais','referencia_direccion','comment','status',
    // 'status2',
    'tipo_rol','abonos','carritos','compras','creditos','gastos','historiales','locals','metodo_pagos','ventas','camiones','acciones'],
    data:['id','nombre','ap_paterno','ap_materno','fecha_nacimiento','genero','fecha_inscripcion','fecha_alta','rfc','curp','nss','tel_cel','tel_cel3','email','tipo_sangre','licencia','alergias','padecimientos','nacionalidad','calle','numero','colonia','cp','municipio','ciudad','pais','referencia_direccion','comment','status','status2','tipo_rol'],
    campo:['Id','Nombre','Apellido Paterno', 'Apellido Materno','Fecha de nacimiento','Genero','Fecha de incripcion','Fecha de alta','RFC','CURP','NSS','Telefono Celular', 'Telefono Celular3','Email', 'Tipo de sangre', 'Licencia','Alergicas','Padecimientos','Nacionalidad','Calle','Numero','Colonia','Codigo Postal','Municipio','Ciudad','Pais','Referencia de dirrrecion', 'Comentario','Status','Status2','Tipo de usuario']
  },
  Vendedores:{
    title: 'Vendedores',
    columns:['nombre','ventas', 'acciones'],
    data:['id','nombre'],
    campo:['Id','Nombre']
  },
  Ventas:{
    title: 'Ventas',
    columns:['monto','monto_total','factura','fecha','clasificacion','fecha_entrega','entrega_pendiente','pagada','status','status2','local','usuario','carritos','metodo_pagos','rutas','vendedores','acciones'],
    data:['id','monto','monto_total','fecha','clasificacion','fecha_entrega','entrega_pendiente','pagada','status'],
    campo:['Id','Monto','Monto total','Fecha','Status','Clasificacion','Fecha de entrega','Entrega pendiente','Pagada']
  },
}
