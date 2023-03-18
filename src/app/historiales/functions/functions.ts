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
export const Historial = {
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (historial:any)=>
      historial.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      historial.fecha.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      historial.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      historial.hora_inicio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      historial.hora_fin.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  Relations(form:any, id_usuario:any, id_camiones:any){
    const formularioHistoriales = Object.assign({}, form.value);

    delete formularioHistoriales.id_usuario;
    delete formularioHistoriales.id_camiones;
    if(!formularioHistoriales.hora_inicio.includes(':00.000')){
      formularioHistoriales.hora_inicio = `${formularioHistoriales.hora_inicio}:00.000`
    }
    if(!formularioHistoriales.hora_fin.includes(':00.000')){
      formularioHistoriales.hora_fin = `${formularioHistoriales.hora_fin}:00.000`
    }
    console.log(formularioHistoriales);
    let body = Object.assign(formularioHistoriales,{});
    if(id_usuario){
      const usuario = {
        usuario :{
          _id: id_usuario
        }
      }
      body = Object.assign(body, usuario);
    }
    if(id_camiones.length > 0){
      const camiones = {
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
  HistorialId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        formGroup.patchValue({
          fecha:data.fecha,
          status:data.status,
          hora_inicio:data.hora_inicio,
          hora_fin:data.hora_fin,
        });
        if(data.usuario){
          formGroup.patchValue({
            id_usuario: data.usuario.id,
          });
        }
        if(data.camiones.length > 0){
          formGroup.patchValue({
            id_camiones: data.camiones[0].id,
          });
        }
      },
      (error:any)=>{
        console.error(error);
        Historial.Mensaje('Error al cargar la informacion en el formulario ',);
      }
    )
  },
  add(service:any,router:any,form:any,id_usuario:any, id_camiones:any){
    let body = Historial.Relations(form, id_usuario, id_camiones);
    service.add('historials', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Historial.Mensaje('historial agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/historiales/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Historial.Mensaje('Error al agregar Historial');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_usuario:any, id_camiones:any){
    let body = Historial.Relations(form, id_usuario, id_camiones);
    service.update('historials',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Historial.Mensaje('Actualización de Historial correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/historiales/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Historial.Mensaje('Error al actualizar el historial');
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
        service.delete('historials',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Mensaje('Historial eliminado correctamente','success')

            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Historial.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  },
}
