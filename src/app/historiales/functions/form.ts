import { Validators } from "@angular/forms";
export const historialesForm = {
  fecha: ['',[Validators.required]],
  status: [false,[Validators.required]],
  hora_inicio: ['',[Validators.required]],
  hora_fin: ['',[Validators.required]],
  id_usuario:[''],
  id_camiones:['']
}
