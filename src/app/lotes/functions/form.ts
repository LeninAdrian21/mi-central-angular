import { Validators } from "@angular/forms";
export const lotesForm = {
  codigo_interno:['',[Validators.required]],
  fecha_arrivo:['',[Validators.required]],
  fecha_caducidad:['',[Validators.required]],
  fecha_adquisicion: ['',[Validators.required]],
  costo:['',[Validators.required]],
  id_compras:[''],
  id_productos:['']
}
