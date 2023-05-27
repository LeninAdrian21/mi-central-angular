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
export const Producto = {
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if(key == 'dimension'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if( key == 'proveedor'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if( key == 'carritos'){
            for(const carrito of item[key]){
              if(!data[key].includes(carrito.cantidad)){
                data[key].push(carrito.cantidad);
              }
            }
          }else if( key == 'promociones'){
            for(const promocion of item[key]){
              if(!data[key].includes(promocion.fecha_creacion)){
                data[key].push(promocion.fecha_creacion);
              }
            }
          }else if( key == 'lotes'){
            for(const lote of item[key]){
              if(!data[key].includes(lote.codigo_interno)){
                data[key].push(lote.codigo_interno);
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
  Relations(form:any, id_dimension:any,id_lote:any, id_promociones:any,id_proveedor:any,id_carritos:any){
    const formularioProductos = Object.assign({},form.value);
    delete formularioProductos.id_dimension;
    delete formularioProductos.id_lote;
    delete formularioProductos.id_promociones;
    delete formularioProductos.id_proveedor;
    delete formularioProductos.id_carritos;
    let body= Object.assign(formularioProductos,{});
    if(id_dimension){
      const dimension ={
        dimension:{
          _id:id_dimension
        }
      }
      body = Object.assign(body, dimension);
    }
    if(id_lote){
      const lote ={
        lote:{
          _id:id_lote
        }
      }
      body = Object.assign(body, lote);
    }
    if(id_promociones){
      const promociones ={
        promociones:[
          {
            _id:id_promociones
          }
        ]
      }
      body = Object.assign(body, promociones);
    }
    if(id_proveedor){
      const proveedor ={
        proveedor:{
          _id:id_proveedor
        }
      }
      body = Object.assign(body, proveedor);
    }
    if(id_carritos){
      const carritos ={
        carritos:[
          {
            _id:id_carritos
          }
        ]
      }
      body = Object.assign(body, carritos);
    }
    return body
  },
  ProductoId(service:any, url:any,formgroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        console.log(data)
        formgroup.patchValue({
          nombre:data.nombre,
          codigo_barras:data.codigo_barras,
          codigo_interno:data.codigo_interno,
          peso_neto:data.peso_neto,
          presentacion:data.presentacion,
          marca:data.marca,
          descripcion_generica:data.descripcion_generica,
          precio:data.precio,
          costo:data.costo,
          inventario_disp:data.inventario_disp,
          value_min:data.value_min,
          status:data.status,
          venta_gramos:data.venta_gramos,
        })
        if(data.dimension){
          formgroup.patchValue({
            id_dimension:data.dimension.id
          })
        }
        if(data.lote){
          formgroup.patchValue({
            id_lote:data.lote.id
          })
        }
        if(data.promociones.length > 0){
          formgroup.patchValue({
            id_promociones:data.promociones[0].id
          })
        }
        if(data.proveedor){
          formgroup.patchValue({
            id_proveedor:data.proveedor.id
          })
        }
        if(data.carritos.length > 0){
          formgroup.patchValue({
            id_carritos:data.carritos[0].id
          })
        }
      },
      (error:any) => {
        console.log(error);
        Producto.Mensaje('Error al cargar la informacion en el formulario ',);
      }
    )
  },
  add(service:any,router:any,form:any, id_dimension:any,id_lote:any, id_promociones:any,id_proveedor:any,id_carritos:any){
    let body = Producto.Relations(form, id_dimension,id_lote, id_promociones,id_proveedor,id_carritos);
    service.add('productos', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Producto.Mensaje('Producto agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/productos/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Producto.Mensaje('Error al agregar Abono');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_dimension:any,id_lote:any, id_promociones:any,id_proveedor:any,id_carritos:any){
    let body = Producto.Relations(form, id_dimension,id_lote, id_promociones,id_proveedor,id_carritos);
    service.update('productos',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Producto.Mensaje('Actualización del producto correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/productos/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Producto.Mensaje('Error al actualizar el producto');
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
        service.delete('productos',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Mensaje('Producto se ha emilinado','success')
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
