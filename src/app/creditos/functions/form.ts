import { Validators } from "@angular/forms";

export const creditosForm = {
  limite: ['',[Validators.required]],
  fecha_alta: ['',[Validators.required]],
  fecha_baja: ['',[Validators.required]],
  vigencia: ['',[Validators.required]],
  intereses: ['',[Validators.required]],
  status: [false],
  id_usuario:[''],
  id_metodoPago:[''],
  id_abonos:['']
}
