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
export const Promocion = {
  ApplyFilter(event:any,dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (promocion:any)=>
      promocion.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      promocion.fecha_creacion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      promocion.fecha_vigencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      promocion.valor_descuento.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      promocion.codigo_ref.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      promocion.condicion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
    );
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
  PromocionesId(service:any, url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        formGroup.patchValue({
          fecha_creacion:data.fecha_creacion,
          fecha_vigencia:data.fecha_vigencia,
          valor_descuento:data.valor_descuento,
          codigo_ref:data.codigo_ref,
          condicion:data.condicion
        })
        if(data.productos.length > 0){
          formGroup.patchValue({
            id_productos:data.productos[0].id
          })
        }
      },
      (error:any) => {
        console.log(error);
        alert('Error');
      }
    )
  },
  Mensaje(string:string,icon:any = 'error'){
    Mensaje(string,icon);
  },
  Relations(form:any,id_productos:any){
    const formularioPromociones = Object.assign({},form.value);
    delete formularioPromociones.value.id_productos;
     let body = Object.assign(formularioPromociones,{});
     if(id_productos){
       const productos = {
         productos:[
           {
             _id:id_productos
           }
         ]
       }
       body = Object.assign(body, productos)
    }
    return body;
  },
  add(service:any,router:any,form:any,id_productos:any){
    let body = Promocion.Relations(form,id_productos)
    service.add('promociones',body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Promocion.Mensaje('Promocion agregada correctamente','success');
        service.addCampo=true;
        setTimeout(() => {
          router.navigate(['/promociones/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Mensaje('Error al agregar la promocion');
      }
    )
  },
  update(service:any,id:any,router:any,form:any,id_productos:any){
    let body = Promocion.Relations(form,id_productos)
    service.update('promociones',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Mensaje('Actualizacion de promocion correctamente','success');
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/promociones/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Mensaje('Error al actualizar promocion','error');
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
        service.delete('promociones',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Mensaje('La Promocion se ha emilinado','success')
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
