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
export const Vendedor = {
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (vendedor:any)=>
      vendedor.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      vendedor.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  Relations(form:any, id_ventas:any){
    const formularioVendedor = Object.assign({},form.value);
    delete formularioVendedor.id_ventas;
    let body = Object.assign(formularioVendedor,{});
    if(id_ventas){
      const ventas = {
        ventas:[
          {
            _id:id_ventas
          }
        ]
      }
      body = Object.assign(body, ventas);
    }
    return body;
  },
  VendedoresId(service:any, url:any,formgroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        formgroup.patchValue({
          nombre:data.nombre
        })
        if(data.ventas.length > 0){
          formgroup.patchValue({
            id_ventas:data.ventas[0].id
          })
        }
      },
      (error:any) => {
        console.log(error);
        alert('Error');
      }
    )
  },
  add(service:any,router:any,form:any, id_ventas:any){
    let body = Vendedor.Relations(form, id_ventas);
    service.add('vendedor', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Vendedor.Mensaje('Vendedor agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/vendedores/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Vendedor.Mensaje('Error al agregar el vendedor');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_ventas:any){
    let body = Vendedor.Relations(form, id_ventas);
    service.update('vendedores',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Vendedor.Mensaje('Actualización de Vendedor correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/vendedores/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Vendedor.Mensaje('Error al actualizar el vendedor');
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
        service.delete('vendedores',id,localStorage.getItem('token')!).subscribe((data:any)=>{
          Mensaje('Vendedor eliminado correctamente','success')
          setTimeout(() => {
            location.reload();
          }, 1000);
          },
          (error:any) =>{
            Vendedor.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  }
}
