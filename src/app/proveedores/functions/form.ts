import { Validators } from "@angular/forms";

export const proveedoresForm = {
  nombre:['',[Validators.required]],
  razon_social:['',[Validators.required]],
  rfc: ['',[Validators.required,  Validators.minLength(14), Validators.maxLength(14)]],
  fecha_alta:['',[Validators.required]],
  calle:['',[Validators.required]],
  numero:['',[Validators.required]],
  colonia:['',[Validators.required]],
  cp:['',[Validators.required]],
  municipio:['',[Validators.required]],
  ciudad:['',[Validators.required]],
  pais:['',[Validators.required]],
  visita_programada:['',[Validators.required]],
  status:['',[Validators.required]],
  id_productos:[''],
  id_compras:[''],
}
