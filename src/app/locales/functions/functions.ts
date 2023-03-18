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
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (local:any)=>
      local.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.alias.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.razon_social.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.rfc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.calle.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.colonia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.numero_ext.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.municipio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.numero_int.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.ciudad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.cp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.latitud.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.longitud.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.telefono.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.telefono_cel.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.giro.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
