
import { Mensaje } from "./functions";
import { FormControl } from '@angular/forms';
function ValidatorPlaca(control:FormControl):any{
  const filtroPLaca = /[-IOQioq]/g;
  const test = filtroPLaca.test(control.value);
  if(test){
    return {validatorPlaca:true}
  }
  return null;
}
export const update:any = {
  abonos: (service: any, url: any, formGroup: any) => {
    service.get(url, localStorage.getItem('token')!).subscribe(
      (data: any) => {
        console.log(data);
        formGroup.patchValue({
          cantidad_abono: data.cantidad_abono,
          fecha_abono: data.fecha_abono,
          estado_abono: data.estado_abono,
        });
        if (data.credito) {
          formGroup.patchValue({
            id_credito: data.credito.id,
          });
        }
        if (data.usuario) {
          formGroup.patchValue({
            id_usuario: data.usuario.id,
          });
        }
      },
      (error: any) => {
        console.error(error);
        Mensaje('Error al cargar la informacion en el formulario ')
      }
    );
  },
  camiones: (service: any, url: any, formGroup: any, formBuilder:any,Validators:any, getplacas:any, gastos:any,rutas:any) => {
    service.get(url,localStorage.getItem('token')!).subscribe(
      (data:any) => {
        formGroup.patchValue({
          num_serie: data.num_serie,
          niv:data.niv
        });
        data.placas.forEach((element: any) => {
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
          getplacas.push(placaFormGroup);
        });

        if (data.gastos.length > 0){
          data.gastos.forEach((element: any) => {
            const gastoFormGroup = formBuilder.group({
              id:[element.id],
            });
            gastos.push(gastoFormGroup);
          });
        }
        if(data.historial){
          formGroup.patchValue({
            id_historial:data.historial.id
          })
        }
        if(data.usuario){
          formGroup.patchValue({
            id_usuario:data.usuario.id
          })
        }
        if(data.rutas.length > 0){
          data.rutas.forEach((element:any) => {
            const rutaFormGroup = formBuilder.group({
              id:[element.id],
            });
            rutas.push(rutaFormGroup);
          });

          // formGroup.patchValue({
          //   id_rutas:data.rutas[0].id
          // })
        }
        // console.log(formBuilder)
      }
    )
  }
};
