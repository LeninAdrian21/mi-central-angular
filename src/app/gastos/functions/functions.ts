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
export const Gasto = {
  // ApplyFilter(event:any, dataSource:any){
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   dataSource.data = dataSource.data.filter(
  //     (gasto:any)=>
  //     gasto.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
  //     gasto.descripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
  //     gasto.fecha.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
  //     gasto.monto.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
  //     gasto.categoria.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
  //     gasto.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
  //   )
  // },
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if( key == 'usuario'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if( key == 'camions'){
            // if(!data[key].includes(item[key].num_serie)){
            //   data[key].push(item[key].num_serie);
            // }
            for(const numcamion of item[key]){
              if(!data[key].includes(numcamion.num_serie)){
                data[key].push(numcamion.num_serie);
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
  GastoId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe((data:any)=>{
      formGroup.patchValue({
        descripcion:data.descripcion,
        fecha:data.fecha,
        monto:data.monto,
        categoria:data.categoria,
        status:data.status,
      })
      if(data.usuario){
        formGroup.patchValue({
          id_usuario:data.usuario.id
        })
      }
      if(data.camions.length > 0){
        formGroup.patchValue({
          id_camiones:data.camions[0].id
        })
      }
    },(error:any)=>{
        console.error(error);
        Gasto.Mensaje('Error al cargar la informacion en el formulario ');
    });
  },
  Relations(form:any, id_camiones:any,id_usuario:any){
    const formularioGastos = Object.assign({},form.value);
    delete formularioGastos.id_usuario
    delete formularioGastos.id_camiones;
    let body = Object.assign(formularioGastos,{});
    if(id_usuario){
      const usuario = {
        usuario: {
          _id: id_usuario,
        },
      };
      body = Object.assign(body, usuario);
    }
    if(id_camiones){
      const camiones = {
        camions:[
          {
            _id:id_camiones
          }
        ]
      }
      body = Object.assign(body, camiones);
    }
    return body;
  },
  add(service:any,router:any,form:any,id_usuario:any,id_camiones:any){
    let body = Gasto.Relations(form, id_usuario,id_camiones);
    service.add('gastos', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Gasto.Mensaje('Gasto agregado Correctamente','success');

        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/gastos/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Gasto.Mensaje('Error al agregar el gasto');
      }
    )
  },
  update(service:any,id:any,router:any,form:any,id_usuario:any,id_camiones:any){
    let body = Gasto.Relations(form, id_usuario,id_camiones);
    service.update('gastos',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Mensaje('Gasto actualizado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/gastos/listar']);
        }, 1600);
      },
      (error:any)=>{
        console.error(error);
        Mensaje('Error al actualizar el gasto');
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
        service.delete('gastos',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Gasto.Mensaje('Gasto se ha emilinado','success')
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Gasto.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  },
}
