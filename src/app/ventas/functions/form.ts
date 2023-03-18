import { Validators } from "@angular/forms";

export const ventasForm = {
  monto: ['',[Validators.required]],
  monto_total:['',[Validators.required]],
  fecha:['',[Validators.required]],
  status:[false,[Validators.required]],
  clasificacion:['',[Validators.required]],
  fecha_entrega:['',[Validators.required]],
  entrega_pendiente:[false,[Validators.required]],
  pagada:[false,[Validators.required]],
  id_usuario:[''],
  id_local:[''],
  id_rutas:[''],
  id_vendedores:[''],
  id_carritos:[''],
  id_metodo_pagos:['']
}
