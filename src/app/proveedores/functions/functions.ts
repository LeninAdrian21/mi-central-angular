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
export const Proveedor = {
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (proveedor:any)=>
      proveedor.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.razon_social.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.rfc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.calle.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.numero.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.colonia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.cp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.municipio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.ciudad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.pais.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.visita_programada.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      proveedor.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  ProveedorId(service:any, url:any,formgroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        formgroup.patchValue({
          nombre:data.nombre,
          razon_social:data.razon_social,
          rfc:data.rfc,
          fecha_alta:data.fecha_alta,
          calle:data.calle,
          numero:data.numero,
          colonia:data.colonia,
          cp:data.cp,
          municipio:data.municipio,
          ciudad:data.ciudad,
          pais:data.pais,
          visita_programada:data. visita_programada,
          status:data.
          status,
        })
        if(data.productos.length > 0){
          formgroup.patchValue({
            id_productos:data.productos[0].id
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
        alert('Error');
      }
    )
  },
  Mensaje(mensaje:string,icon:any ='error'){
    Mensaje(mensaje,icon);
  },
  Relations(form:any, id_productos:any, id_compras:any){
    const formularioProveedores = Object.assign({},form.value);
    delete formularioProveedores.value.id_productos;
    delete formularioProveedores.value.id_compras;
    let body = Object.assign(formularioProveedores,{});
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
    if(id_compras){
      const compras ={
        compras: [
          {
            _id:id_compras
          }
        ]
      }
      body = Object.assign(body, compras);
    }
  },
  add(service:any,router:any,form:any, id_productos:any, id_compras:any){
    let body = Proveedor.Relations(form,id_productos, id_compras);
    service.add('proveedors', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Proveedor.Mensaje('Proveedor agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/proveedores/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Proveedor.Mensaje('Error al agregar Proveedor');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_productos:any, id_compras:any){
    let body = Proveedor.Relations(form, id_productos, id_compras);
    service.update('proveedors',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Proveedor.Mensaje('Actualización de Proveedor correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/proveedores/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Proveedor.Mensaje('Error al actualizar el proveedor');
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
        service.delete('proveedors',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Mensaje('Proveedor se ha emilinado','success')
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
