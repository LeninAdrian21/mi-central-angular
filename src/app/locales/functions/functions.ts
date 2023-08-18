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
export const Local = {
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if( key == 'usuarios'){
            // if(!data[key].includes(item[key].nombre)){
            //   data[key].push(item[key].nombre);
            // }
            for(const numusu of item[key]){
              if(!data[key].includes(numusu.nombre)){
                data[key].push(numusu.nombre);
              }
            }
          }else if( key == 'ventas'){
            // if(!data[key].includes(item[key].monto)){
            //   data[key].push(item[key].monto);
            // }
            for(const numventa of item[key]){
              if(!data[key].includes(numventa.monto)){
                data[key].push(numventa.monto);
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
  Relations(form:any, id_ventas:any,id_usuarios:any){
    const formularioLotes = Object.assign({},form.value);
    delete formularioLotes.id_ventas;
    delete formularioLotes.id_usuarios;
    let body = Object.assign(formularioLotes,{});
    if(id_ventas){
      const ventas = {
        ventas: [
          {
            _id: id_ventas,
          }
        ],
      };
      body = Object.assign(body, ventas);
    }
    if(id_usuarios){
      const usuarios = {
        usuarios: {
          _id: id_usuarios,
        },
      };
      body = Object.assign(body, usuarios);
    }
    return body;
  },
  LocalId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        console.log(data)
        formGroup.patchValue({
          nombre:data.nombre,
          alias:data.alias,
          razon_social:data.razon_social,
          rfc:data.rfc,
          fecha_alta:data.fecha_alta,
          calle:data.calle,
          colonia:data.colonia,
          numero_ext:data.numero_ext,
          municipio:data.municipio,
          numero_int:data.numero_int,
          ciudad:data.ciudad,
          cp:data.cp,
          latitud:data.latitud,
          longitud:data.longitud,
          telefono:data.telefono,
          telefono_cel:data.telefono_cel,
          giro:data.giro,
          status:data.status
        })
        if(data.ventas.length > 0){
          formGroup.patchValue({
            id_ventas:data.ventas[0].id
          })
        }
        if(data.usuarios.length > 0){
          formGroup.patchValue({
            id_usuario:data.usuarios[0].id
          })
        }

      },
      (error:any) => {
        console.log(error);
        alert('Error');
      }
    )
  },
  add(service:any,router:any,form:any, id_ventas:any,id_usuarios:any){
    let body = Local.Relations(form, id_ventas,id_usuarios);
    service.add('locals', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Local.Mensaje('Local agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/locales/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Local.Mensaje('Error al agregar el Local');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_ventas:any,id_usuarios:any){
    let body = Local.Relations(form, id_ventas,id_usuarios);
    service.update('locals',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Local.Mensaje('Actualización de Local correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/locales/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Local.Mensaje('Error al actualizar el local');
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
        service.delete('locals',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Mensaje('Locales eliminado correctamente','success')
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Local.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  },

}
