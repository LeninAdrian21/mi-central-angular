import { Validators } from "@angular/forms";

export const rutasForm = {
  descripcion:['',[Validators.required]],
  lugar_origen:['',[Validators.required]],
  destino:['',[Validators.required]],
  fecha_salida:['',[Validators.required]],
  fecha_llegada:['',[Validators.required]],
  ruta_ciclica:[false,[Validators.required]],
  referencia:['',[Validators.required]],
  nombre_mercancia_recibida:['',[Validators.required]],
  comentarios:['',[Validators.required]],
  estado:['',[Validators.required]],
  id_ventas:[''],
  id_camiones:['']
}
