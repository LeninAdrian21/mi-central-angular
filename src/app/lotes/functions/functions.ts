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
export const Lote ={
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (lote:any)=>
      lote.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      lote.codigo_interno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      lote.fecha_arrivo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      lote.fecha_caducidad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      lote.fecha_adquisicion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
      lote.costo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  Relations(form:any, id_compras:any,id_productos:any){
    const formularioLotes = Object.assign({},form.value);
    delete formularioLotes.id_compras;
    delete formularioLotes.id_productos;
    let body = Object.assign(formularioLotes,{});
    if(id_compras){
      const compras = {
        compras: [
          {
            _id: id_compras,
          },
        ]
      };
      body = Object.assign(body, compras);
    }
    if(id_productos){
      const productos = {
        products: [
          {
            _id: id_productos,
          }
        ]
      };
      body = Object.assign(body, productos);
    }
    return body;
  },
  LoteId(service:any, url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        formGroup.patchValue({
          codigo_interno:data.codigo_interno,
          fecha_arrivo:data.fecha_arrivo,
          fecha_caducidad:data.fecha_caducidad,
          fecha_adquisicion:data.fecha_adquisicion,
          costo:data.costo,
        })
        if(data.compras.length > 0){
          formGroup.patchValue({
            id_compras:data.compras[0].id
          })
        }
        if(data.products.length > 0){
          formGroup.patchValue({
            id_productos:data.products[0].id
          })
        }
      },
      (error:any) => {
        console.log(error);
        Lote.Mensaje('Error al poner la informacion al formulario');
      }
    )
  },
  add(service:any,router:any,form:any, id_compras:any,id_productos:any){
    let body = Lote.Relations(form, id_compras,id_productos);
    service.add('lotes', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Lote.Mensaje('Lote agregado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/lotes/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Lote.Mensaje('Error al agregar Abono');
      }
    )
  },
  update(service:any,id:any,router:any,form:any, id_compras:any,id_productos:any){
    let body = Lote.Relations(form, id_compras,id_productos);
    service.update('lotes',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Lote.Mensaje('Actualización de Lote correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/lotes/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Lote.Mensaje('Error al actualizar el lote');
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
        service.delete('lotes',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Lote.Mensaje('Lote eliminado correctamente','success')

            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Lote.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  },
}
