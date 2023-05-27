import Swal from "sweetalert2";
function Mensaje(mensaje:any, icon:any = 'error'){
  Swal.fire({
    position: 'center',
    icon: icon,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  })
}
export const Carrito ={
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if(key == 'productos'){
            for(const numproduc of item[key]){
              if(!data[key].includes(numproduc.nombre)){
                data[key].push(numproduc.nombre);
              }
            }
          }else if( key == 'usuario'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if( key == 'venta'){
            if(!data[key].includes(item[key].monto)){
              data[key].push(item[key].monto);
            }
            // for(const numvent of item[key]){
            //   if(!data[key].includes(numvent.monto)){
            //     data[key].push(numvent.monto);
            //   }
            // }
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
  CarritoId(service:any, url:any, formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        formGroup.patchValue({
          cantidad: data.cantidad
        })
        if (data.usuario){
          formGroup.patchValue({
            id_usuario:data.usuario.id
          })
        }
        if(data.productos.length > 0){
          formGroup.patchValue({
            id_productos: data.productos[0].id
          })
        }
        if(data.venta){
          formGroup.patchValue({
            id_venta:data.venta.id
          })
        }
      },
      (error:any) => {
        console.log(error);
        Mensaje('Error al cargar la informaicon en el informacion')
      }
    );

  },
  Mensaje(string:string,icon:any = 'error'){
    Mensaje(string,icon);
  },
  Relations(form:any,id_productos:any,id_usuario:any,id_venta:any){
    const formularioCarritos = Object.assign({},form.value);
    delete formularioCarritos.id_productos;
    delete formularioCarritos.id_usuario;
    delete formularioCarritos.id_venta;
    let body = Object.assign(formularioCarritos,{});
    if(id_productos){
      const productos ={
        productos:[
          {
            _id:id_productos
          }
        ]
      }
      body = Object.assign(body, productos);
    }
    if(id_usuario){
      const usuario = {
        usuario:{
          _id:id_usuario
        }
      }
      body = Object.assign(body, usuario);
    }
    if(id_venta){
      const venta ={
        venta:{
          _id:id_venta
        }
      }
      body = Object.assign(body, venta);
    }
    return body;
  },
  add(service:any,router:any,form:any,id_productos:any,id_usuario:any,id_venta:any){
    let body = Carrito.Relations(form,id_productos,id_usuario,id_venta)
    service.add('carritos',body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Carrito.Mensaje('Carrito agregado correctamente','success');
        service.addCampo=true;
        setTimeout(() => {
          router.navigate(['/carritos/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Mensaje('Error al agregar carrito');
      }
    )
  },
  update(service:any,id:any,router:any,form:any,id_productos:any,id_usuario:any,id_venta:any){
    let body = Carrito.Relations(form,id_productos,id_usuario,id_venta)
    service.update('carritos',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Mensaje('Actualizacion de carrito correctamente','success');
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/carritos/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Mensaje('Error al actualizar carrito','error');
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
        service.delete('carritos',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Mensaje('Carrito se ha emilinado','success')
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  }
}
