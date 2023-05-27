import Swal from "sweetalert2";
function Mensaje(mensaje:string, icon:any = 'error'){
  Swal.fire({
    position: 'center',
    icon: icon,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  })
}
function noEstaRepetido(valor:any, array:any) {
  return array.indexOf(valor) === array.lastIndexOf(valor);
}
export const Usuario = {
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key !== '__typename' && key !== 'last_login' && item[key]){
          if(key == 'tipo_rol'){
            if(!data[key].includes(item[key].rol)){
              data[key].push(item[key].rol);
            }
          }else if( key == 'abonos'){
            for (const abono of item[key]){
              if(!data[key].includes(abono.cantidad_abono)){
                data[key].push(abono.cantidad_abono);
              }
            }
          }else if( key == 'carritos'){
            for (const carrito of item[key]){
              if(!data[key].includes(carrito.cantidad)){
                data[key].push(carrito.cantidad);
              }
            }
          }else if( key == 'compras'){
            for (const compra of item[key]){
              if(!data[key].includes(compra.costo)){
                data[key].push(compra.costo);
              }
            }
          }else if( key == 'creditos'){
            for (const credito of item[key]){
              if(!data[key].includes(credito.limite)){
                data[key].push(credito.limite);
              }
            }
          }
          else if( key == 'gastos'){
            for (const gasto of item[key]){
              if(!data[key].includes(gasto.descripcion)){
                data[key].push(gasto.descripcion);
              }
            }
          }
          else if( key == 'historiales'){
            for (const historial of item[key]){
              if(!data[key].includes(historial.fecha)){
                data[key].push(historial.fecha);
              }
            }
          }
          else if( key == 'locals'){
            for (const local of item[key]){
              if(!data[key].includes(local.nombre)){
                data[key].push(local.nombre);
              }
            }
          }
          else if( key == 'metodo_pagos'){
            for (const metodo_pago of item[key]){
              if(!data[key].includes(metodo_pago.titular)){
                data[key].push(metodo_pago.titular);
              }
            }
          }
          else if( key == 'ventas'){
            for (const ventas of item[key]){
              if(!data[key].includes(ventas.monto)){
                data[key].push(ventas.monto);
              }
            }
          }
          else if( key == 'camiones'){
            for (const camion of item[key]){
              if(!data[key].includes(camion.num_serie)){
                data[key].push(camion.num_serie);
              }
            }
          }
          else{
            if(!data[key].includes(item[key])){
              data[key].push(item[key]);
            }
          }
        }
      }
    }
    console.log(data);
  },
  OpenDialog(id:any,url:any,title:any,table:any,dialog:any,component:any){
    dialog.open(component, {
      height:'550px',width:'500px',
      data:{
        id,
        url,
        title:title,
        table:table
      }
    });
  },
  Mensaje(mensaje:string,icon:any ='error'){
    Mensaje(mensaje,icon);
  },
  Relations(form:any, id_tipo_rol:any,id_locales:any,id_gastos:any,id_camiones:any,id_carritos:any,id_abonos:any,id_creditos:any,id_ventas:any,id_historiales:any,id_metodo_pagos:any){
    const formularioUsuarios = Object.assign({},form.value);
    delete formularioUsuarios.id_tipo_rol;
    delete formularioUsuarios.id_locales;
    delete formularioUsuarios.id_gastos;
    delete formularioUsuarios.id_camiones;
    delete formularioUsuarios.id_carritos;
    delete formularioUsuarios.id_abonos;
    delete formularioUsuarios.id_creditos;
    delete formularioUsuarios.id_ventas;
    delete formularioUsuarios.id_historiales;
    delete formularioUsuarios.id_metodo_pagos;
    let body = Object.assign(formularioUsuarios,{});
    if(id_tipo_rol){
      const tipo_rol ={
        tipo_rol:{
          _id: id_tipo_rol
        }
      }
      body = Object.assign(body, tipo_rol);
    }
    if(id_locales){
      const locales ={
        locals:[
          {
            _id:id_locales
          }
        ]
      }
      body = Object.assign(body, locales)
    }
    if(id_gastos){
      const gastos = {
        gastos:[
          {
            _id:id_gastos
          }
        ]
      }
      body = Object.assign(body, gastos)
    }

    if(id_camiones){
      const camiones =[
        {
          _id:id_camiones
        }
      ]
      body = Object.assign(body, camiones)
    }
    if(id_carritos){
      const carritos = {
        carritos:[
          {
            _id:id_carritos
          }
        ]
      }
      body = Object.assign(body, carritos)
    }
    if(id_abonos){
      const abonos = {
        abonos:[
          {
            _id:id_abonos
          }
        ]
      }
      body = Object.assign(body, abonos)
    }
    if(id_creditos){
      const creditos = {
        creditos:[
          {
            _id:id_creditos
          }
        ]
      }
      body = Object.assign(body, creditos)
    }
    if(id_ventas){
      const ventas =[
        {
          _id:id_ventas
        }
      ]
      body = Object.assign(body, ventas)
    }
    if(id_historiales){
      const historiales = {
        historials:[
          {
            _id:id_historiales
          }
        ]
      }
      body = Object.assign(body, historiales)
    }
    if(id_metodo_pagos){
      const metodo_pagos={
        metodo_pagos:[
          {
            _id:id_metodo_pagos
          }
        ]
      }
      body = Object.assign(body, metodo_pagos)
    }
    return body;
  },
  UsuarioId(service:any, url:any,formgroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        formgroup.patchValue({
          nombre:data.nombre,
          ap_paterno:data.ap_paterno,
          ap_materno:data.ap_materno,
          fecha_nacimiento:data.fecha_nacimiento,
          genero:data.genero,
          fecha_inscripcion:data.fecha_ins,
          fecha_alta:data.fecha_alta,
          rfc:data.rfc,
          curp:data.curp,
          nss:data.nss,
          tel_cel:data.tel_cel,
          email:data.email,
          tipo_sangre:data.tipo_sangre,
          licencia:data.licencia,
          alergias:data.alergias,
          padecimientos:data.padecimientos,
          nacionalidad:data.nacionalidad,
          calle:data.calle,
          numero:data.numero,
          colonia:data.colonia,
          cp:data.cp,
          municipio:data.municipio,
          ciudad:data.ciudad,
          pais:data.pais,
          referencia_directa:data.ref_dir,
          comment:data.comment,
          status:data.status,
        })
        if(data.tipo_rol){
          formgroup.patchValue({
            id_tipo_rol: data.tipo_rol.id
          })
        }
        if(data.locales.length > 0){
          formgroup.patchValue({
            id_locales:data.locales[0].id
          })
        }
        if(data.gastos.length > 0){
          formgroup.patchValue({
            id_gastos:data.gastos[0].id
          })
        }
        if(data.camiones.length > 0){
          formgroup.patchValue({
            id_camiones:data.camiones[0].id
          })
        }
        if(data.carritos.length > 0){
          formgroup.patchValue({
            id_carritos:data.carritos[0].id
          })
        }
        if(data.abonos.length > 0){
          formgroup.patchValue({
            id_abonos:data.abonos[0].id
          })
        }
        if(data.creditos.length > 0){
          formgroup.patchValue({
            id_creditos:data.creditos[0].id
          })
        }
        if(data.ventas.length > 0){
          formgroup.patchValue({
            id_ventas:data.ventas[0].id
          })
        }
        if(data.historiales.length > 0){
          formgroup.patchValue({
            id_historiales:data.historiales[0].id
          })
        }
        if(data.metodo_pagos.length > 0){
          formgroup.patchValue({
            id_metodo_pagos:data.metodo_pagos[0].id
          })
        }
      },
      (error:any) => {
        console.log(error);
        Usuario.Mensaje('Error al cargar la informacion en el formulario ');
      }
    )
  },
  add(service:any,router:any,form:any, id_tipo_rol:any,id_locales:any,id_gastos:any,id_camiones:any,id_carritos:any,id_abonos:any,id_creditos:any,id_ventas:any,id_historiales:any,id_metodo_pagos:any){
    let body = Usuario.Relations(form, id_tipo_rol,id_locales,id_gastos,id_camiones,id_carritos,id_abonos,id_creditos,id_ventas,id_historiales,id_metodo_pagos);
    service.add('usuario', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Usuario.Mensaje('Usuario agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/usuarios/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Usuario.Mensaje('Error al agregar usuario');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_tipo_rol:any,id_locales:any,id_gastos:any,id_camiones:any,id_carritos:any,id_abonos:any,id_creditos:any,id_ventas:any,id_historiales:any,id_metodo_pagos:any){
    let body = Usuario.Relations(form, id_tipo_rol,id_locales,id_gastos,id_camiones,id_carritos,id_abonos,id_creditos,id_ventas,id_historiales,id_metodo_pagos);
    service.update('usuarios',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Usuario.Mensaje('Actualización de Usuario correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/usuarios/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Usuario.Mensaje('Error al actualizar el usuario');
      }
    )
  },
  delete(id:string,service:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete('usuarios',id,localStorage.getItem('token')!).subscribe((data:any)=>{
          Mensaje('Usuario eliminado correctamente','success')
          setTimeout(() => {
            location.reload();
          }, 1000);
          },
          (error:any) =>{
            Usuario.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  }
}
