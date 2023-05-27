import { FormControl } from "@angular/forms";
import { Usuario } from "src/app/usuarios/functions/functions";
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
function ValidatorPlaca(control:FormControl):any{
  const filtroPLaca = /[-IOQioq]/g;
  const test = filtroPLaca.test(control.value);
  if(test){
    return {validatorPlaca:true}
  }
  return null;
}
const filter=(valor:any, indice:any, lista:any)=> {
  return !(lista.indexOf(valor) === indice);
}
export const Camion = {
  ListaAutoComplete(data:any, options:any){
    for(const item of options){
      for(const key in item){
        if(key != '__typename' && item[key]){
          if(key == 'rutas'){
            for(const numrutas of item[key]){
              if(!data[key].includes(numrutas.destino)){
                data[key].push(numrutas.destino);
              }
            }
          }else if( key == 'historial'){
            if(!data[key].includes(item[key].fecha)){
              data[key].push(item[key].fecha);
            }
          }
          else if( key == 'usuario'){
            if(!data[key].includes(item[key].nombre)){
              data[key].push(item[key].nombre);
            }
          }else if( key == 'gastos'){
            // if(!data[key].includes(item[key].categoria)){
            //   data[key].push(item[key].categoria);
            // }
            for(const numgastos of item[key]){
              if(!data[key].includes(numgastos.categoria)){
                data[key].push(numgastos.categoria);
              }
            }
          }else if( key == 'placas'){
            for(const numPlacas of item[key]){
              if(!data.placas.includes(numPlacas.placa)){
                data.placas.push(numPlacas.placa)
              }
              if(!data.estado.includes(numPlacas.estado)){
                data.estado.push(numPlacas.estado) 
              }
              if(numPlacas.activa === true || numPlacas.activa === false){
                if(!data.placa_activa.includes(numPlacas.activa) ){
                  data.placa_activa.push(numPlacas.activa)
                }
              }
             
            }
          }
          else{
            if(!data[key].includes(item[key])){
              data[key].push(item[key]);
            }
          }
        }
      }
    }
  },
  Addplacas(placas:any, addplacas:any, activa:[boolean],data:any){
    if(placas.length > 0){
      placas.forEach((element:any) => {
        element.placa = element.placa.toUpperCase();
        element.estado = element.estado.toUpperCase();
        data.placas.push(element);
        activa.push(element.activa)
      });
    }
    if(addplacas.length > 0){
      addplacas.forEach((element:any) => {
        element.placa = element.placa.toUpperCase();
        element.estado = element.estado.toUpperCase();
        data.placas.push(element);
        activa.push(element.activa)
      });
    }
  },
  PlacaActiva(activa:any):string{
    if(activa.length > 0){
      if(!activa.find((element:any) => element == true)){
        return  'Tienes que poner una placa activa';
      }
      activa = activa.filter((item:any)=> item !== false);
      if(activa.some(filter)){
        return  'No puede haber mas de 1 placa activa';
      }
    }
    return '';
  },
  PlacaRepetida(data:any):string{
    let placa:any = []
    data.placas.forEach((element:any) => {
      placa.push(element.placa);
    });
    if(placa.some(filter)){
      return 'Alguna placa esta repetida'
    }
    return '';
  },
  Mensaje(mensaje:string){
    Mensaje(mensaje);
  },
  Relations(form:any, data:any, id_historial:any, id_gastos:any,id_rutas:any, id_usuario:any):any{
    const formularioCamiones = Object.assign({},form.value);
    delete formularioCamiones.placas;
    delete formularioCamiones.addplacas;
    delete formularioCamiones.id_historial
    delete formularioCamiones.id_gastos
    delete formularioCamiones.id_rutas
    delete formularioCamiones.id_usuario;
    let body = Object.assign(formularioCamiones, data);
    if(id_historial){
      const historial = {
        historial:{
          _id:id_historial
        }
      }
      body = Object.assign(body, historial);
    }
    if(id_gastos){
      const gastos = {
        gastos:[
          {
            _id:id_gastos
          }
        ]
      }
      body = Object.assign(body, gastos);
    }
    if(id_rutas){
      const rutas  = {
        rutas:[
          {
            _id:id_rutas
          }
        ]
      }
      body = Object.assign(body, rutas);
    }
    if(id_usuario){
      const  usuarios = {
        usuario:{
          _id:id_usuario
        }
      }
      body = Object.assign(body, usuarios);
    }
    return body;
  },
  ErrorsCamionesAddPlacas(addplacasErrors:any){
    const errorsPlacaAddPlacas:any =[];
    const errorsEstadoAddPlacas:any =[];
    addplacasErrors.forEach((element:any) => {
      errorsPlacaAddPlacas.push(element.controls.placa.errors);
      errorsEstadoAddPlacas.push(element.controls.estado.errors);
    });
    return {errorsPlacaAddPlacas,errorsEstadoAddPlacas}
  },
  ErrorsCamionesPlacas(addplacasErrors:any){
    const errorsPlacaPlacas:any =[];
    const errorsEstadoPlacas:any =[];
    addplacasErrors.forEach((element:any) => {
      errorsPlacaPlacas.push(element.controls.placa.errors);
      errorsEstadoPlacas.push(element.controls.estado.errors);
    });
    return {errorsPlacaPlacas,errorsEstadoPlacas}
  },
  openDialog(id:string,url:string,title:string,table:string,dialog:any,component:any){
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
  CamionId(service:any, url:any,formgroup:any, formBuilder:any, Validators:any, getplacas:any, token:any){
    service.get(url,token).subscribe(
      (data:any) => {
        console.log(data);
        const {placas} = data;
        formgroup.patchValue({
          num_serie:data.num_serie,
          niv:data.niv
        })
        placas.forEach((element: any) => {
          const placaFormGroup = formBuilder.group({
            placa:[element.placa,[
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(6),
              Validators.pattern(/^[A-Za-z0-9]+$/),
              ValidatorPlaca.bind(this)
            ]],
            activa:[element.activa],
            estado:[element.estado,[Validators.required,
            Validators.minLength(4)]]
          });
          getplacas.push(placaFormGroup)
        })
        if (data.gastos.length > 0){
          formgroup.patchValue({
            id_gastos:data.gastos[0].id
          })
        }
        if(data.historial){
          formgroup.patchValue({
            id_historial:data.historial.id
          })
        }
        if(data.usuario){
          formgroup.patchValue({
            id_usuario:data.usuario.id
          })
        }
        if(data.rutas.length > 0){
          formgroup.patchValue({
            id_rutas:data.rutas[0].id
          })
        }

      },
      (error:any) => {
        console.log(error);
        alert('Error');
      }
    );
  },
  add(service:any,router:any,form:any, data:any, id_historial:any, id_gastos:any,id_rutas:any, id_usuario:any){
    let body = Camion.Relations(form, data, id_historial, id_gastos,id_rutas, id_usuario)
    service.add('camiones', body, localStorage.getItem('token')!).subscribe(
      (data:any) =>{
        Mensaje('Camion agregado Correctamente','success');

        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/camiones/listar']);
        }, 1600);
      },
      (error:any) =>{
        console.error(error);
        Camion.Mensaje('Error al agregar el camion');
      }
    )
  },
  update(service:any, id:any,router:any,form:any, data:any, id_historial:any, id_gastos:any,id_rutas:any, id_usuario:any){
    let body = Camion.Relations(form, data, id_historial, id_gastos,id_rutas, id_usuario)
    service.update('camiones',id,body,localStorage.getItem('token')!).subscribe(
      (data:any)=>{
        Mensaje('Camion actualizado correctamente','success')
        service.addCampo = true;
        setTimeout(() => {
          router.navigate(['/camiones/listar']);
        }, 1600);
      },
      (error:any)=>{
        console.error(error);
        Mensaje('Error al actualizar el camion');
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
        service.delete('camiones',id,localStorage.getItem('token')!).subscribe((data:any)=>{
          Mensaje('Camion eliminado correctamente','success')
          setTimeout(() => {
            location.reload();
          }, 1000);
          },
          (error:any) =>{
            Camion.Mensaje('No se pudo eliminar')
          }
        )
      }
    })
  }
}
