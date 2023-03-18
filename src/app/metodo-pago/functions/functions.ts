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
export const MetodoPago = {
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (metodoPago:any)=>
        metodoPago.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.numero_tarjeta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.mes.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.anio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.cvc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.titular.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.fecha_expedicion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.fecha_ingreso.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.folio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.referencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.tipo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        metodoPago.descripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  Relations(form:any, id_usuario:any, id_venta:any, id_creditos:any, id_compras:any){
    const formularioMetodosPago = Object.assign({},form.value);
    delete formularioMetodosPago.id_usuario;
    delete formularioMetodosPago.id_venta;
    delete formularioMetodosPago.id_creditos;
    delete formularioMetodosPago.id_compras;
    let body = Object.assign(formularioMetodosPago,{});
    if(id_usuario){
      const usuario ={
        usuario:{
          _id:id_usuario
        }
      }
      body = Object.assign(body,usuario)
    }
    if(id_venta){
      const venta = {
        venta:{
          _id:id_venta
        }
      }
      body = Object.assign(body,venta)
    }
    if(id_creditos){
      const creditos={
        creditos:[
          {
            _id:id_creditos
          }
        ]
      }
      body = Object.assign(body,creditos)
    }
    if(id_compras){
      const compras ={
        compras:[
          {
            _id:id_compras
          }
        ]
      }
      body = Object.assign(body,compras)
    }
    return body;
  },
  MetodoPagoId(service:any, url:any,formgroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        console.log(data)
        formgroup.patchValue({
          numero_tarjeta:data.numero_tarjeta,
          mes:data.mes,
          anio:data.anio,
          cvc:data.cvc,
          titular:data.titular,
          fecha_expedicion:data.fecha_expedicion,
          fecha_ingreso:data.fecha_ingreso,
          folio:data.folio,
          referencia:data.referencia,
          tipo:data.tipo,
          descripcion:data.descripcion,
        })
        if(data.usuario){
          formgroup.patchValue({
            id_usuario:data.usuario.id
          })
        }
        if(data.venta){
          formgroup.patchValue({
            id_venta:data.venta.id
          })
        }
        if(data.creditos.length > 0){
          formgroup.patchValue({
            id_creditos:data.creditos[0].id
          })
        }
        if(data.compras.length > 0){
          formgroup.patchValue({
            id_compras:data.compras[0].id
          })
        }
      },
      (error:any) => {
        console.log(error);
        MetodoPago.Mensaje('Error al cargar la informacion en el formulario ',);
      }
    )
  },
  add(service:any,router:any,form:any, id_usuario:any, id_venta:any, id_creditos:any, id_compras:any){
    let body = MetodoPago.Relations(form, id_usuario, id_venta, id_creditos, id_compras);
    service.add('metodo-pagos', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        MetodoPago.Mensaje('Metodo de pago  agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/metodo-pago/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        MetodoPago.Mensaje('Error al agregar Metodo de pago');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_usuario:any, id_venta:any, id_creditos:any, id_compras:any){
    let body = MetodoPago.Relations(form, id_usuario, id_venta, id_creditos, id_compras);
    service.update('metodo-pagos',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        MetodoPago.Mensaje('Actualización de metodo de pago correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/metodo-pago/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        MetodoPago.Mensaje('Error al actualizar el metodo de pago');
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
        service.delete('metodo-pagos',id,localStorage.getItem('token')!).subscribe((data:any)=>{
          Mensaje('Metodo de pago eliminado correctamente','success')
          setTimeout(() => {
            location.reload();
          }, 1000);
          },
          (error:any) =>{
            MetodoPago.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  },
}
