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
export const Venta = {
  ListaAutoComplete(data:any, options:any){
    console.log(options);
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if(key == 'local'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if(key == 'usuario'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if(key == 'carritos'){
            for(const carrito of item[key]){
              if(!data[key].includes(carrito.cantidad)){
                data[key].push(carrito.cantidad);
              }
            }
          }else if(key == 'metodo_pagos'){
            for(const metodo_pago of item[key]){
              if(!data[key].includes(metodo_pago.titular)){
                data[key].push(metodo_pago.titular);
              }
            }
          }else if(key == 'rutas'){
            for(const ruta of item[key]){
              if(!data[key].includes(ruta.destino)){
                data[key].push(ruta.destino);
              }
            }
          }else if(key == 'vendedores'){
            for(const vendedor of item[key]){
              if(!data[key].includes(vendedor.nombre)){
                data[key].push(vendedor.nombre);
              }
            }
          }else{
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
  Relations(form:any, id_usuario:any,id_local:any,id_rutas:any,id_vendedores:any,id_carritos:any,id_metodo_pagos:any){
    const formularioVentas = Object.assign({},form.value);
    delete formularioVentas.id_usuario;
    delete formularioVentas.id_local;
    delete formularioVentas.id_rutas;
    delete formularioVentas.id_vendedores;
    delete formularioVentas.id_carritos;
    delete formularioVentas.id_metodo_pagos;
    let body = Object.assign(formularioVentas,{});
    if(id_usuario){
      const usuario ={
        usuario:{
          _id:id_usuario
        }
      }
      body = Object.assign(body,usuario);
    }
    if(id_local){
      const local={
        local:{
          _id:id_local
        }
      }
      body = Object.assign(body,local);
    }
    if(id_rutas){
      const rutas ={
        rutas:[
          {
            _id:id_rutas
          }
        ]
      }
      body = Object.assign(body,rutas);
    }
    if(id_vendedores){
      const vendedores ={
        vendedores:[
          {
            _id:id_vendedores
          }
        ]
      }
      body = Object.assign(body,vendedores);
    }
    if(id_carritos){
      const carritos={
        carritos:[
          {
            _id:id_carritos
          }
        ]
      }
      body = Object.assign(body,carritos);
    }
    if(id_metodo_pagos){
      const metodo_pagos = {
        metodo_pagos:[
          {
            _id:id_metodo_pagos
          }
        ]
      }
      body = Object.assign(body,metodo_pagos);
    }
    return body;
  },
  VentaId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        formGroup.patchValue({
          monto:data.monto,
          monto_total:data.monto_total,
          fecha:data.fecha,
          status:data.status,
          factura:data.factura,
          clasificacion:data.clasificacion,
          fecha_entrega:data.fecha_entrega,
          entrega_pendiente:data.entrega_pendiente,
          pagada:data.pagada,
        })
        if(data.usuario){
          formGroup.patchValue({
            id_usuario:data.usuario.id
          })
        }
        if(data.local){
          formGroup.patchValue({
            id_local:data.local.id
          })
        }
        if(data.rutas.length > 0){
          formGroup.patchValue({
            id_rutas:data.rutas[0].id
          })
        }
        if(data.vendedores.length > 0){
          formGroup.patchValue({
            id_vendedores:data.vendedores[0].id
          })
        }
        if(data.carritos.length > 0){
          formGroup.patchValue({
            id_carritos:data.carritos[0].id
          })
        }
        if(data.metodo_pagos.length > 0){
          formGroup.patchValue({
            id_metodo_pagos:data.metodo_pagos[0].id
          })
        }
      },
      (error:any)=>{
        console.error(error);
        Venta.Mensaje('Error al cargar la informacion en el formulario ');
      }
    )
  },
  add(service:any,router:any,form:any, id_usuario:any,id_local:any,id_rutas:any,id_vendedores:any,id_carritos:any,id_metodo_pagos:any){
    let body = Venta.Relations(form, id_usuario,id_local,id_rutas,id_vendedores,id_carritos,id_metodo_pagos);
    service.add('ventas', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Venta.Mensaje('Venta agregads correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/ventas/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Venta.Mensaje('Error al agregar Venta');
      }
    )
  },
  update(service:any,id:any,router:any,form:any,id_usuario:any,id_local:any,id_rutas:any,id_vendedores:any,id_carritos:any,id_metodo_pagos:any){
    let body = Venta.Relations(form, id_usuario,id_local,id_rutas,id_vendedores,id_carritos,id_metodo_pagos);
    service.update('ventas',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Venta.Mensaje('Actualización de venta correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/ventas/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Venta.Mensaje('Error al actualizar el venta');
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
        service.delete('ventas',id,localStorage.getItem('token')!).subscribe((data:any)=>{
          Mensaje('Venta eliminada correctamente','success')
          setTimeout(() => {
            location.reload();
          }, 1000);
          },
          (error:any) =>{
            Venta.Mensaje('No se pudo eliminar')
          }

        )
      }
    })
  }
}
