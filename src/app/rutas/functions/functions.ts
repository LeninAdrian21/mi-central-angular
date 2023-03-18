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
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (ruta:any)=>
      ruta.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      ruta.descripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      ruta.lugar_origen.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      ruta.destino.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      ruta.fecha_salida.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      ruta.fecha_llegada.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      ruta.ruta_ciclica.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      ruta.referencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      ruta.nombre_mercancia_recibida.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      ruta.comentarios.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      ruta.estado.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
    )
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
