
import { Mensaje } from "./functions";
export const update:any = {
  abonos: (service: any, url: any, formGroup: any) => {
    service.get(url, localStorage.getItem('token')!).subscribe(
      (data: any) => {
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
};
