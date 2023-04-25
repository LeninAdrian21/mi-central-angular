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
export const Abono = {
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if(key == 'usuario'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if( key == 'credito'){
            if(!data[key].includes(item[key].intereses)){
              console.log(item[key].intereses)
              data[key].push(item[key].intereses);
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
  Relations(form:any, id_credito:any,id_usuario:any,date:any){
    const formularioAbonos = Object.assign({},form.value);
    delete formularioAbonos.id_credito
    delete formularioAbonos.id_usuario;
    let body = Object.assign(formularioAbonos,{});
    if(id_credito){
      const credito = {
        credito: {
          _id: id_credito,
        },
      };
      body = Object.assign(body, credito);
    }
    if(id_usuario){
      const usuario = {
        usuario: {
          _id: id_usuario,
        },
      };
      body = Object.assign(body, usuario);
    }
    const fecha = {
      fecha_abono:date
    }
    body = Object.assign(body,fecha);
    return body;
  },
  AbonoId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        formGroup.patchValue({
          cantidad_abono:data.cantidad_abono,
          fecha_abono: data.fecha_abono,
          estado_abono: data.estado_abono,
        });
        if(data.credito){
          formGroup.patchValue({
            id_credito: data.credito.id,
          });
        }
        if(data.usuario){
          formGroup.patchValue({
            id_usuario: data.usuario.id,
          });
        }
      },
      (error:any)=>{
        console.error(error);
        Abono.Mensaje('Error al cargar la informacion en el formulario ',);
      }
    )
  },
  add(service:any,router:any,form:any, id_credito:any,id_usuario:any,date:any){
    let body = Abono.Relations(form, id_credito,id_usuario,date);
    service.add('abonos', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Abono.Mensaje('Abono agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/abonos/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Abono.Mensaje('Error al agregar Abono');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_credito:any,id_usuario:any,date:any){
    let body = Abono.Relations(form, id_credito,id_usuario,date);
    service.update('abonos',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Abono.Mensaje('Actualización de Abono correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/abonos/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Abono.Mensaje('Error al actualizar el abono');
      }
    )
  },
  delete(id:string,service:any){
    const body = {
      mostrar:false
    }
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
        service.update('abonos',id,body,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Abono.Mensaje('Abono eliminado correctamente','success');
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Abono.Mensaje('No se pudo eliminar');
          }
        )
      }
    })
  },
};
