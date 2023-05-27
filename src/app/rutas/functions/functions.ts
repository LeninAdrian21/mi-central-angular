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
export const Ruta = {
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if(key == 'camiones'){
            for (const camion of item[key]){
              if(!data[key].includes(camion.num_serie)){
                data[key].push(camion.num_serie);
              }
            }
          }else if( key == 'ventas'){
            for(const venta of item[key]){
              if(!data[key].includes(venta.monto)){
                data[key].push(venta.monto);
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
  Relations(form:any, id_ventas:any,id_camiones:any){
    const formularioRutas = Object.assign({},form.value);
    delete formularioRutas.id_ventas;
    delete formularioRutas.id_camiones;
    let body = Object.assign(formularioRutas,{});
    if (id_ventas){
      const ventas ={
        ventas:[
          {
            _id:id_ventas
          }
        ]
      }
      body = Object.assign(body, ventas);
    }
    if(id_camiones){
      const camiones ={
        camiones:[
          {
            _id:id_camiones
          }
        ]
      }
      body = Object.assign(body, camiones);
    }
    return body;
  },
  RutasId(service:any, url:any,formgroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        formgroup.patchValue({
          descripcion:data.descripcion,
          lugar_origen:data.lugar_origen,
          destino:data.destino,
          fecha_salida:data.fecha_salida,
          fecha_llegada:data.fecha_llegada,
          ruta_ciclica:data.ruta_ciclica,
          referencia:data.referencia,
          nombre_mercancia_recibida:data.nombre_mercancia_recibida,
          comentarios:data.comentarios,
          estado:data.estado,
        })
        if(data.ventas.length > 0){
          formgroup.patchValue({
            monto_venta:data.ventas[0].id
          })
        }
        if(data.camiones.length > 0){
          formgroup.patchValue({
            num_serie_camion:data.camiones[0].id
          })
        }
      },
      (error:any) => {
        console.log(error);
        alert('Error');
      }
    )
  },
  add(service:any,router:any,form:any, id_ventas:any,id_camiones:any){
    let body = Ruta.Relations(form, id_ventas,id_camiones);
    service.add('rutas', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Ruta.Mensaje('Ruta agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/rutas/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Ruta.Mensaje('Error al agregar Ruta');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_ventas:any,id_camiones:any){
    let body = Ruta.Relations(form, id_ventas,id_camiones);
    service.update('rutas',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Ruta.Mensaje('Actualización de Ruta correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/rutas/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Ruta.Mensaje('Error al actualizar la ruta');
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
        service.delete('rutas',id,localStorage.getItem('token')!).subscribe((data:any)=>{
          Mensaje('Ruta eliminado correctamente','success')
          setTimeout(() => {
            location.reload();
          }, 1000);
          },
          (error:any) =>{
            Ruta.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  }
}
