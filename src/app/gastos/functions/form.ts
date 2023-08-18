import { Validators } from "@angular/forms";

export const gastosForm = {
  descripcion: ['',[Validators.required]],
  fecha: ['',[Validators.required]],
  monto: ['',[Validators.required]],
  categoria: ['',[Validators.required]],
  status: [false,[Validators.required]],
  id_usuario:[''],
  id_camiones:['']
}
