
const token = localStorage.getItem('token');
//Dialog

export function openDialog(id:string,url:string,title:string,table:string,dialog:any,component:any){
  dialog.open(component, {
    height:'550px',width:'500px',
    data:{
      id,
      url,
      title:title,
      table:table
    }
  });
}
export function deleteDialog(id:string,service:any,url:any,dialog:any,component:any){
  dialog.open(component, {
    height:'230px',width:'520px',
    data:{
      id,
      service,
      url
    }
  });
}

export function abonoId(service:any,url:any, formGroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      formGroup.patchValue({
        cantidad_abono: data.cantidad_abono,
        fecha_abono: data.fecha_abono,
        estado_abono: data.estado_abono,
      });
      if (data.credito){
        formGroup.patchValue({
          credito_id: data.credito.id,
          usuario_id: data.usuario.id,
        });
      }
      if(data.usuario){
        formGroup.patchValue({
          usuario_id: data.usuario.id,
        });
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  );
}
export function camionId(service:any, url:any,formgroup:any, formBuilder:any, Validators:any, getplacas:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {placas} = data;
      formgroup.patchValue({
        num_serie:data.num_serie,
        niv:data.niv
      })
      placas.forEach((element: any) => {
        const placaFormGroup = formBuilder.group({
          placa: [element.placa,[Validators.required]],
          activa: [element.activa,[Validators.required]],
          estado: [element.estado,[Validators.required,  Validators.minLength(4),, Validators.maxLength(17)]],
        });
        getplacas.push(placaFormGroup)
      })
      if (data.gastos.length > 0){
        formgroup.patchValue({
          id_gastos:data.gastos[0].id
        })
      }
      if(data.historial){
        formgroup.patchValue({
          id_historial:data.historial.id
        })
      }
      if(data.usuario){
        formgroup.patchValue({
          id_usuario:data.usuario.id
        })
      }
      if(data.rutas.length > 0){
        formgroup.patchValue({
          id_rutas:data.rutas[0].id
        })
      }

    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  );
}
export function carritoId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      formgroup.patchValue({
        cantidad: data.cantidad
      })
      if (data.usuario){
        formgroup.patchValue({
          id_usuario:data.usuario.id
        })
      }
      if(data.productos.length > 0){
        formgroup.patchValue({
          id_productos: data.productos[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  );
}
export function compraId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      formgroup.patchValue({
        costo:data.costo,
        fecha_pedido: data.fecha_pedido,
        referencia: data.referencia,
        fecha_llegada: data.fecha_llegada,
        status: data.status
      })
      if(data.metodos_de_pago){
        formgroup.patchValue({
          id_metodoPago:data.metodos_de_pago.id
        })
      }
      if(data.lote){
        formgroup.patchValue({
          id_lote:data.lote.id
        })
      }
      if(data.proveedor){
        formgroup.patchValue({
          id_proveedor:data.proveedor.id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function creditoId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {limite,Fecha_alta,fecha_baja,vigencia,intereses,status,usuario,metodos_de_pago,abonos} = data;
      formgroup.patchValue({
        limite,
        Fecha_alta,
        fecha_baja,
        vigencia,
        intereses,
        status,
      })
      if(usuario){
        formgroup.patchValue({
          id_usuario:usuario.id
        })
      }
      if(metodos_de_pago){
        formgroup.patchValue({
          id_metodoPago:metodos_de_pago.id
        })
      }
      if(abonos.length > 0){
        formgroup.patchValue({
          id_abonos:abonos[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function dimensionesId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {Nombre,ancho,alto,largo,productos} = data;
      formgroup.patchValue({
        Nombre,
        ancho,
        alto,
        largo
      })
      if(productos.length > 0){
        formgroup.patchValue({
          id_productos:productos[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function gastosId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {descripcion,fecha,monto,categoria,status,usuario,camion} = data;
      formgroup.patchValue({
        descripcion,
        fecha,
        monto,
        categoria,
        status
      })
      if(usuario){
        formgroup.patchValue({
          id_usuario:usuario.id
        })
      }
      if(camion){
        formgroup.patchValue({
          id_camion:camion.id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function historialesId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {fecha,status,hora_inicio,hora_fin,usuario,camions} = data;
      formgroup.patchValue({
        fecha,status,hora_inicio,hora_fin
      })
      if(usuario){
        formgroup.patchValue({
          id_usuario:usuario.id
        })
      }
      if(camions.length > 0){
        formgroup.patchValue({
          id_camiones:camions[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function localesId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      console.log(data)
      const {
        nombre,
        alias,
        razon_social,
        rfc,
        fecha_alta,
        calle,
        Colonia,
        numero_ext,
        Municipio,
        numero_int,
        ciudad,
        cp,
        latitud,
        longitud,
        telefono,
        telefono_cel,
        giro,
        status,
        ventas,
        usuario
      } = data;
      formgroup.patchValue({
        nombre,
        alias,
        razon_social,
        rfc,
        fecha_alta,
        calle,
        Colonia,
        numero_ext,
        Municipio,
        numero_int,
        ciudad,
        cp,
        latitud,
        longitud,
        telefono,
        telefono_cel,
        giro,
        status,
      })
      if(ventas.length > 0){
        formgroup.patchValue({
          id_ventas:ventas[0].id
        })
      }
      if(usuario.length > 0){
        formgroup.patchValue({
          id_usuario:usuario[0].id
        })
      }

    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function lotesId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {
        Codigo_interno,
        fecha_arrivo,
        fecha_caducidad,
        fecha_adquisio,
        costo,
        compras,
        productos
      } = data;
      formgroup.patchValue({
        Codigo_interno,
        fecha_arrivo,
        fecha_caducidad,
        fecha_adquisio,
        costo,
      })
      if(compras.length > 0){
        formgroup.patchValue({
          costo_compra:compras[0].id
        })
      }
      if(productos.length > 0){
        formgroup.patchValue({
          nombre_producto:productos[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function metodoPagoId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      console.log(data)
      const {
        numero_tarjeta,
        mes,
        anio,
        cvc,
        titular,
        fecha_expedicion,
        fecha_ingreso,
        folio,
        referencia,
        tipo,
        descripcion,
        usuario,
        venta,
        creditos,
        compras
      } = data;
      formgroup.patchValue({
        numero_tarjeta,
        mes,
        anio,
        cvc,
        titular,
        fecha_expedicion,
        fecha_ingreso,
        folio,
        referencia,
        tipo,
        descripcion,
      })
      if(usuario){
        formgroup.patchValue({
          id_usuario:usuario.id
        })
      }
      if(venta){
        formgroup.patchValue({
          id_venta:venta.id
        })
      }
      if(creditos.length > 0){
        formgroup.patchValue({
          id_creditos:creditos[0].id
        })
      }
      if(compras.length > 0){
        formgroup.patchValue({
          id_compras:compras[0].id
        })
      }

    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function productosId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      console.log(data)
      const {
        nombre,
        codigo_barras,
        codigo_interno,
        peso_neto,
        presentacion,
        marca,
        descripcion_generica,
        precio,
        costo,
        inventario_disp,
        value_min,
        status,
        venta_gramos,
        dimension,
        lote,
        promociones,
        proveedor,
        carritos,
      } = data;
      formgroup.patchValue({
        nombre,
        codigo_barras,
        codigo_interno,
        peso_neto,
        presentacion,
        marca,
        descripcion_generica,
        precio,
        costo,
        inventario_disp,
        value_min,
        status,
        venta_gramos,
      })
      if(dimension){
        formgroup.patchValue({
          id_dimension:dimension.id
        })
      }
      if(lote){
        formgroup.patchValue({
          id_lote:lote.id
        })
      }
      if(promociones.length > 0){
        formgroup.patchValue({
          id_promociones:promociones[0].id
        })
      }
      if(proveedor){
        formgroup.patchValue({
          id_proveedor:proveedor.id
        })
      }
      if(carritos.length > 0){
        formgroup.patchValue({
          id_carritos:carritos[0].id
        })
      }

    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function promocionesId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {
        fecha_creacion,
        fecha_vigencia,
        valor_descuento,
        codigo_ref,
        condicion,
        productos
      } = data;

      formgroup.patchValue({
        fecha_creacion,
        fecha_vigencia,
        valor_descuento,
        codigo_ref,
        condicion
      })
      if(productos.length > 0){
        formgroup.patchValue({
          producto_nombre:productos[0].id
        })
      }

    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function proveedoresId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {
        nombre,
        razon_social,
        rfc,
        fecha_alta,
        calle,
        numero,
        colonia,
        cp,
        municipio,
        ciudad,
        pais,
        visita_programada,
        status,
        productos,
        compras
      } = data;
      formgroup.patchValue({
        nombre,
        razon_social,
        rfc,
        fecha_alta,
        calle,
        numero,
        colonia,
        cp,
        municipio,
        ciudad,
        pais,
        visita_programada,
        status,
      })
      if(productos.length > 0){
        formgroup.patchValue({
          producto_nombre:productos[0].id
        })
      }
      if(compras.length > 0){
        formgroup.patchValue({
          id_compra:compras[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function rutasId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {
        descripcion,
        lugar_origen,
        destino,
        fecha_salida,
        fecha_llegada,
        ruta_ciclica,
        referencia,
        nombre_mercancia_recibida,
        comentarios,
        estado,
        ventas,
        camions
      } = data;
      formgroup.patchValue({
        descripcion,
        lugar_origen,
        destino,
        fecha_salida,
        fecha_llegada,
        ruta_ciclica,
        referencia,
        nombre_mercancia_recibida,
        comentarios,
        estado,
      })
      if(ventas.length > 0){
        formgroup.patchValue({
          monto_venta:ventas[0].id
        })
      }
      if(camions.length > 0){
        formgroup.patchValue({
          num_serie_camion:camions[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function usuariosId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {
        nombre,
        ap_paterno,
        ap_materno,
        fecha_nac,
        genero,
        fecha_ins,
        fecha_alta,
        rfc,
        curp,
        nss,
        tel_cel,
        email,
        tipo_sangre,
        licencia,
        alergias,
        padecimientos,
        nacionalidad,
        calle,
        numero,
        colonia,
        cp,
        municipio,
        ciudad,
        pais,
        ref_dir,
        status,
        comment,
        abonos,
        camiones,
        carritos,
        creditos,
        gastos,
        historials,
        local,
        ventas,
        metodos_de_pagos,
        tipo_rol
      } = data;
      formgroup.patchValue({
        nombre,
        ap_paterno,
        ap_materno,
        fecha_nac,
        genero,
        fecha_ins,
        fecha_alta,
        rfc,
        curp,
        nss,
        tel_cel,
        email,
        tipo_sangre,
        licencia,
        alergias,
        padecimientos,
        nacionalidad,
        calle,
        numero,
        colonia,
        cp,
        municipio,
        ciudad,
        pais,
        ref_dir,
        status,
        comment,
      })
      if(gastos.length > 0){
        formgroup.patchValue({
          monto_gasto:gastos[0].id
        })
      }
      if(local.length > 0){
        formgroup.patchValue({
          nombre_local:local[0].id
        })
      }
      if(ventas.length > 0){
        formgroup.patchValue({
          monto_venta:ventas[0].id
        })
      }
      if(camiones.length > 0){
        formgroup.patchValue({
          num_serie_camion:camiones[0].id
        })
      }
      if(carritos.length > 0){
        formgroup.patchValue({
          id_carrito:carritos[0].id
        })
      }
      if(abonos.length > 0){
        formgroup.patchValue({
          cantidad_abono:abonos[0].id
        })
      }
      if(creditos.length > 0){
        formgroup.patchValue({
          limite_credito:creditos[0].id
        })
      }
      if(historials.length > 0){
        formgroup.patchValue({
          fecha_historial:historials[0].id
        })
      }
      if(metodos_de_pagos.length > 0){
        formgroup.patchValue({
          numero_tarjeta_metodo_pago:metodos_de_pagos[0].id
        })
      }
      if(tipo_rol){
        formgroup.patchValue({
          rol_id: tipo_rol.id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function VendedoresId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {
        nombre,
        ventas
      } = data;
      formgroup.patchValue({
        nombre
      })
      if(ventas.length > 0){
        formgroup.patchValue({
          monto_venta:ventas[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function VentasId(service:any, url:any,formgroup:any){
  service.get(url,token).subscribe(
    (data:any) => {
      const {
        monto,
        monto_total,
        fecha,
        status,
        clasificacion,
        fecha_entrega,
        entrega_pendiente,
        pagada,
        carritos,
        local,
        metodos_de_pagos,
        rutas,
        usuario,
        vendedor//es
      } = data;
      formgroup.patchValue({
        monto,
        monto_total,
        fecha,
        status,
        clasificacion,
        fecha_entrega,
        entrega_pendiente,
        pagada,
      })
      if(usuario){
        formgroup.patchValue({
          nombre_usuario:usuario.id
        })
      }
      if(local){
        formgroup.patchValue({
          nombre_local:local.id
        })
      }
      if(rutas.length > 0){
        formgroup.patchValue({
          lugar_origen_ruta:rutas[0].id
        })
      }
      if(vendedor.length > 0){
        formgroup.patchValue({
          nombre_vendedor:vendedor[0].id
        })
      }
      if(carritos.length > 0){
        formgroup.patchValue({
          cantidad_carrito:carritos[0].id
        })
      }
      if(metodos_de_pagos.length > 0){
        formgroup.patchValue({
          numero_tarjeta_metodo_pago:metodos_de_pagos[0].id
        })
      }
    },
    (error:any) => {
      console.log(error);
      alert('Error');
    }
  )
}
export function Add(url:any,body:any,service:any,router:any,mensaje:any, navigate:any){
  service.add(url,body,token).subscribe(
    (data:any) => {
      alert(mensaje);
      router.navigate([navigate]);
      service.addCampo = true;
    },
    (error:any) => {
      console.log(error);
      alert('Error al agregar');
    }
  );
}
export function Update(url:any, id:any,body:any,router:any,service:any, mensaje:any, navigate:any){
  service.update(url,id,body,token).subscribe(
    (data:any) => {
      alert(mensaje);
      router.navigate([navigate]);
      service.addCampo = true;
    },
    (error:any) => {
      console.log(error);
      alert('Error al actualizar');
    }
  );
}
export function Delete(id:string,service:any,url:string ){
  service.delete(url, id,token).subscribe(
    (data:any) => {
      alert('Se ha eliminado');
      location.reload();
    },
    (error:any) => {
      alert('Error al eliminar');
      console.log(error);
    }
  );
}

export function deleteMostrar(id:string, service:any, url:string){
  const body = {
    mostrar:false
  }
  service.update(url, id, body,token).subscribe(
    (data:any) => {
      alert('Se ha eliminado correctamente');
      location.reload();
    },
    (error:any) => {
      alert('Error al eliminar');
      console.log(error);
    }
  );
}
export function deleteDialogMostrar(id:string,service:any,url:any,title:any,dialog:any,component:any){
  dialog.open(component, {
    height:'230px',width:'520px',
    data:{
      id,
      service,
      url,
      title,
      mostrar:true
    }
  });
}
