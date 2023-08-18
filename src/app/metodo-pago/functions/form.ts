 import { Validators } from "@angular/forms";
export const metodosPagoForm = {
  numero_tarjeta:['',[Validators.required]],
  mes:['',[Validators.required]],
  anio:['',[Validators.required]],
  cvc:['',[Validators.required]],
  titular:['',[Validators.required]],
  fecha_expedicion:['',[Validators.required]],
  fecha_ingreso:['',[Validators.required]],
  folio:['',[Validators.required]],
  referencia:['',[Validators.required]],
  tipo:['',[Validators.required]],
  descripcion:['',[Validators.required]],
  id_usuario:[''],
  id_venta:[''],
  id_creditos:[''],
  id_compras:['']
}
