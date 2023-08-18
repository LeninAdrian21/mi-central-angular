import Swal from 'sweetalert2';
import { relations } from './relations';
import { update } from './update';
export function Mensaje(mensaje: string, icon: any = 'error') {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  });
}
export const Funcions = {
  ListaAutoComplete(data: any, options: any) {
    for (const item of options) {
      for (const key in item) {
        if (key != '__typename' && item[key]) {
          if (key == 'usuario') {
            if (!data[key].includes(item[key].nombre)) {
              data[key].push(item[key].nombre);
            }
          } else if (key == 'credito') {
            if (!data[key].includes(item[key].intereses)) {
              // console.log(item[key].intereses);
              data[key].push(item[key].intereses);
            }
          } else {
            if (!data[key].includes(item[key])) {
              data[key].push(item[key]);
            }
          }
        }
      }
    }
  },
  Dialog(dialog:any, component:any,height:any,width:any,data?:any){
    dialog.open(component, {
      height,
      width,
      data,
    });
  },
  OpenDialog(
    id: any,
    url: any,
    title: any,
    table: any,
    dialog: any,
    component: any
  ) {
    dialog.open(component, {
      height: '550px',
      width: '500px',
      data: {
        id,
        url,
        title: title,
        table: table,
      },
    });
  },
  FilterDialog( dialog: any,
    component: any,data?: any){
      dialog.open(component, {
        height: '700px',
        width: '1000px',
        data: data,
      });
  },
  Relations(form: any, collection: string, date?: any) {
    return relations(form, collection, date);
  },
  CollectionId(service: any, url: any, formGroup: any,collection: any,formBuilder?:any,Validators?:any,getplacas?:any,gastos?:any,rutas?:any) {
    console.log(getplacas)
    update[collection](service, url, formGroup,formBuilder,Validators,getplacas,gastos,rutas);
  },
  add(service:any,router:any,form:any,url:any, collection: any,navigate:any,message:any,error_message:any,date?:any) {
    let body = Funcions.Relations(form, collection, date);
    service.add(url, body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Mensaje(message,'success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate([navigate]);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Mensaje(error_message);
      }
    )
  },
  update(service:any,url:any,id:any,router:any,form:any, collection:any, navigate:any){
    let body = Funcions.Relations(form,collection);
    service.update(url,id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Mensaje('Se ha actualizado','success');
        service.addCampo = true;
        setTimeout(()=> {
          router.navigate([navigate]);
        },1600);
      },
      (error:any) =>{
        console.log(error);
        Mensaje('Error al actualizar');
      }
    )
  },
  delete(id:string,service:any,url:any,peticion:any,message:any,error_message = 'No se pudo eliminar'){
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
        if(peticion == 'update_mostrar'){
          service.update(url,id,{mostrar:false},localStorage.getItem('token')!).subscribe(
            (data:any)=>{
              Mensaje(message,'success');
              setTimeout(() => {
                location.reload();
              }, 1000);
            },
            (error:any) =>{
              Mensaje(error_message);
            }
          )
        }
      }
    })
  },

};




