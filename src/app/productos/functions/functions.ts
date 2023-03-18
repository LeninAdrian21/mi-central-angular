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
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (producto:any)=>
      producto.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.codigo_barras.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.codigo_interno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.peso_neto.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.presentacion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.marca.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.descripcion_generica.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.precio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.costo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.inventario_disp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.value_min.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      producto.venta_gramos.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
