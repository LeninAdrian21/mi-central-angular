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
export const Dimension ={
  ApplyFilter(event:any, dataSource:any){
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.data = dataSource.data.filter(
      (dimension:any)=>
      dimension.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      dimension.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        dimension.ancho.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        dimension.alto.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        dimension.largo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
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
  Mensaje(mensaje:string,icon:any ='error'){
    Mensaje(mensaje,icon);
  },
  Relations(form:any,id_productos:any){
    const formularioDimensiones = Object.assign({}, form.value);
    delete formularioDimensiones.id_productos;
    let body = Object.assign(formularioDimensiones,{});
    if(id_productos){
      const productos = {
        productos:[
          {
            _id:id_productos
          }
        ]
      }
      body = Object.assign(body, productos);
    }
    return body;
  },
  DimensionId(service:any,url:any,formGroup:any){
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any)=>{

        formGroup.patchValue({
        nombre:data.nombre,
        ancho:data.ancho,
        alto:data.alto,
        largo:data.largo
      })
      if(data.productos.length > 0){
        formGroup.patchValue({
          id_productos:data.productos[0].id
        })
      }
      },
      (error:any)=>{
        console.error(error);
        Dimension.Mensaje('Error al cargar la informacion en el formulario ',);
      }
    )
  },
  add(service:any,router:any,form:any,id_productos:any){
    let body = Dimension.Relations(form,id_productos);
    service.add('dimensiones', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Dimension.Mensaje('Dimension agregada correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/dimensiones/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Dimension.Mensaje('Error al agregar dimension');
      }
    )
  },
  update(service:any,id:any,router:any,form:any,id_productos:any){
    let body = Dimension.Relations(form,id_productos);
    service.update('dimensiones',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Dimension.Mensaje('Actualización de Dimension correctamente','success')
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate(['/dimensiones/listar']);
        },1600);
      },
      (error:any)=>{
        console.error(error);
        Dimension.Mensaje('Error al actualizar la dimension');
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
        service.delete('dimensiones',id,localStorage.getItem('token')!).subscribe(
          (data:any)=>{
            Mensaje('Dimension eliminada correctamente','success')
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error:any) =>{
            Dimension.Mensaje('No se pudo eliminar');
          }
        )
      }
    })
  },
}
