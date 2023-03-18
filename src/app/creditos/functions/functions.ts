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
export const Credito ={
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (credito:any)=>
      credito.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      credito.limite.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      credito.fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      credito.fecha_baja.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      credito.vigencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      credito.intereses.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      credito.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  Relations(form:any, id_usuario:any,id_metodoPago:any,id_abonos:any){
    const formularioCreditos = Object.assign({},form.value);
    delete formularioCreditos.id_usuario
    delete formularioCreditos.id_metodoPago;
    delete formularioCreditos.id_abonos;
    let body = Object.assign(formularioCreditos,{});
    if (id_usuario){
      const usuario = {
        usuario:{
          _id:id_usuario
        }
      }
      body = Object.assign(body, usuario)
    }
    if(id_metodoPago){
      const metodoPago = {
        metodo_pago:{
          _id:id_metodoPago
        },
      }
      body= Object.assign(body, metodoPago)
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
    return body;
  },
  CreditoId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        formGroup.pathValue({
          limite:data.limite,
          fecha_alta:data.fecha_alta,
          fecha_baja:data.fecha_baja,
          vigencia:data.vigencia,
          intereses:data.intereses,
          status:data.status
        });
        if(data.usuario){
          formGroup.patchValue({
            id_usuario:data.usuario.id
          })
        }
        if(data.metodo_de_pago){
          formGroup.patchValue({
            id_metodoPago:data.metodo_de_pago.id
          })
        }
        if(data.abonos.length > 0){
          formGroup.patchValue({
            id_abonos:data.abonos[0].id
          })
        }
      },
      (error:any)=>{
        console.error(error);
        Credito.Mensaje('Error al cargar la informacion en el formulario ',);
      }

    )
  },
  add(service:any,router:any,form:any,id_usuario:any,id_metodoPago:any,id_abonos:any){
    let body = Credito.Relations(form,id_usuario,id_metodoPago,id_abonos);
    service.add('creditos', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Credito.Mensaje('Credito agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/creditos/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Credito.Mensaje('Error al agregar Credito');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_usuario:any,id_metodoPago:any,id_abonos:any){
    let body = Credito.Relations(form,id_usuario,id_metodoPago,id_abonos);
    service.update('abonos',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Credito.Mensaje('Actualización de Abono correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/abonos/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Credito.Mensaje('Error al actualizar el abono');
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
            Credito.Mensaje('Credito eliminado correctamente','success');
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Credito.Mensaje('No se pudo eliminar');
          }
        )
      }
    })
  },
}
