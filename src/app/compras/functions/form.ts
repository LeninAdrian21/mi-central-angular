import { Validators } from "@angular/forms";

export const comprasForm = {
  costo: ['',[Validators.required]],
  fecha_pedido: ['',[Validators.required]],
  referencia: ['',[Validators.required]],
  fecha_llegada: ['',[Validators.required]],
  status: [false],
  id_metodoPago:[''],
  id_lote:[''],
  id_proveedor:[''],
  id_usuarios:['']
}
