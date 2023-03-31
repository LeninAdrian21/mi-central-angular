import { Validators } from "@angular/forms";

export const abonosForm = {
  cantidad_abono:['',[Validators.required]],
  fecha_abono:[{value:'',
  disabled:true
}],
  estado_abono:['',[Validators.required]],
  id_credito:[''],
  id_usuario:[''],
}
