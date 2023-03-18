import Swal from "sweetalert2";
function Mensaje(mensaje:string, icon:any = 'error'){
  Swal.fire({
    position: 'center',
    icon: icon,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  });
}
export const Compra = {
  ApplyFilter(event:any, dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (compra:any)=>
      compra.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      compra.costo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      compra.fecha_pedido.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      compra.referencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      compra.fecha_llegada.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      compra.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  CompraId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe((data:any)=>{
      formGroup.patchValue({
        costo:data.costo,
        fecha_pedido: data.fecha_pedido,
        referencia: data.referencia,
        fecha_llegada: data.fecha_llegada,
        status: data.status
      })
      if(data.metodo_pago){
        formGroup.patchValue({
          id_metodoPago:data.metodo_pago.id
        })
      }
      if(data.lote){
        formGroup.patchValue({
          id_lote:data.lote.id
        })
      }
      if(data.proveedor){
        formGroup.patchValue({
          id_proveedor:data.proveedor.id
        })
      }
      if(data.usuarios.length > 0){
        formGroup.patchValue({
          id_usuarios:data.usuarios[0].id
        })
      }
    },(error:any)=>{
        console.error(error);
        Compra.Mensaje('Error al cargar la informacion en el formulario ',);
    });
  },
  Relations(form:any,id_metodoPago:any,id_lote:any,id_proveedor:any,id_usuarios:any ){
    const formularioCompras = Object.assign({},form.value);
    delete formularioCompras.id_metodoPago;
    delete formularioCompras.id_lote;
    delete formularioCompras.id_proveedor;
    delete formularioCompras.id_usuarios;
    let body = Object.assign(formularioCompras,{});
    if(id_metodoPago){
      const metodo_pago={
        metodo_pago:{
          _id:id_metodoPago
        }
      }
      body = Object.assign(body, metodo_pago);
    }
    if(id_lote){
      const lote={
        lote:{
          _id:id_lote
        }
      }
      body = Object.assign(body, lote);
    }
    if(id_proveedor){
      const proveedor ={
        proveedor:{
          _id:id_proveedor
        }
      }
      body = Object.assign(body, proveedor)
    }
    if(id_usuarios){
      const usuarios ={
        usuarios:[
          {
            _id:id_usuarios
          }
        ]
      }
      body = Object.assign(body, usuarios)
    }
    return body;
  },
  add(service:any,router:any,form:any,id_metodoPago:any,id_lote:any,id_proveedor:any,id_usuarios:any){
    let body = Compra.Relations(form, id_metodoPago,id_lote,id_proveedor,id_usuarios);
    service.add('compras', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Compra.Mensaje('Compra agregada Correctamente','success');

        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/compras/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Compra.Mensaje('Error al agregar el camion');
      }
    )
  },
  update(service:any,id:any,router:any,form:any,id_metodoPago:any,id_lote:any,id_proveedor:any,id_usuarios:any){
    let body = Compra.Relations(form, id_metodoPago,id_lote,id_proveedor,id_usuarios);
    service.update('compras',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Mensaje('Compra actualizada correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/compras/listar']);
        }, 1600);
      },
      (error:any)=>{
        console.error(error);
        Mensaje('Error al actualizar el compra');
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
        service.delete('compras',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Compra.Mensaje('Compra se ha emilinado','success')
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Compra.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  }
}
